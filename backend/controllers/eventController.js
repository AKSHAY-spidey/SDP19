const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const event = new Event({ ...req.body, organizer: req.user.id });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(400).json({ message: 'Error creating event', error: error.message });
    }
};

// Modify an existing event
exports.modifyEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user is the organizer
        if (event.organizer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to modify this event' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error modifying event:', error);
        res.status(400).json({ message: 'Error modifying event', error: error.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user is the organizer
        if (event.organizer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await Event.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(400).json({ message: 'Error deleting event', error: error.message });
    }
};

// Cancel an event
exports.cancelEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user is the organizer
        if (event.organizer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to cancel this event' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, { isCancelled: true }, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error canceling event:', error);
        res.status(400).json({ message: 'Error canceling event', error: error.message });
    }
};

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};

// Get events by organizer
exports.getEventsByOrganizer = async (req, res) => {
    const { organizerId } = req.params;

    try {
        const events = await Event.find({ organizer: organizerId });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events by organizer:', error);
        res.status(500).json({ message: 'Error fetching events by organizer', error: error.message });
    }
};