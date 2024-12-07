// backend/controllers/userController.js
const User = require('../models/User');
const Event = require('../models/Event');
const { sendEmail } = require('../services/mailService'); // Import the email service

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('eventsRegistered');
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Register for an event
exports.registerForEvent = async (req, res) => {
    const { eventId } = req.body;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const user = await User.findById(req.user.id);
        if (user.eventsRegistered.includes(eventId)) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        user.eventsRegistered.push(eventId);
        await user.save();

        // Send a confirmation email
        await sendEmail(user.email, 'Event Registration Confirmation', `You have successfully registered for the event: ${event.name}`);

        res.json({ message: 'Successfully registered for the event' });
    } catch (error) {
        console.error('Error registering for event:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Unregister from an event
exports.unregisterFromEvent = async (req, res) => {
    const { eventId } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user.eventsRegistered.includes(eventId)) {
            return res.status(400).json({ message: 'Not registered for this event' });
        }

        user.eventsRegistered = user.eventsRegistered.filter(id => id.toString() !== eventId);
        await user.save();
        
        // Send a confirmation email for unregistration
        await sendEmail(user.email, 'Event Unregistration Confirmation', `You have successfully unregistered from the event: ${eventId}`);

        res.json({ message: 'Successfully unregistered from the event' });
    } catch (error) {
        console.error('Error unregistering from event:', error);
        res.status(500).json({ message: 'Server error' });
    }
};