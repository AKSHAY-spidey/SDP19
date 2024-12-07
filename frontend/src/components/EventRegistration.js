import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Import toast for notifications
import { useAuth } from '../AuthContext'; // Import useAuth to access authentication context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const EventRegistration = ({ eventId }) => {
    const { user, setUser } = useAuth(); // Get user and setUser function from context
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    // Get registered events from localStorage or initialize empty array
    const getRegisteredEvents = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        return storedUser ? storedUser.registeredEvents || [] : [];
    };

    // Check if the user is registered for the event
    const isRegistered = getRegisteredEvents().includes(eventId);

    const handleRegister = () => {
        setLoading(true);
        try {
            const updatedUser = { ...user, registeredEvents: [...getRegisteredEvents(), eventId] };
            // Update user data in localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser); // Update user state

            toast.success('Registered for the event successfully!');
            navigate('/live-chat'); // Redirect to live chat page
        } catch (error) {
            console.error('Error registering for event:', error);
            toast.error('Failed to register for event');
        } finally {
            setLoading(false);
        }
    };

    const handleUnregister = () => {
        setLoading(true);
        try {
            const updatedEvents = getRegisteredEvents().filter(id => id !== eventId);
            const updatedUser = { ...user, registeredEvents: updatedEvents };

            // Update user data in localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser); // Update user state

            toast.success('Unregistered from the event successfully!');
        } catch (error) {
            console.error('Error unregistering from event:', error);
            toast.error('Failed to unregister from event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="event-registration">
            {isRegistered ? (
                <button onClick={handleUnregister} disabled={loading} className="unregister-button">
                    {loading ? 'Unregistering...' : 'Unregister from Event'}
                </button>
            ) : (
                <button onClick={handleRegister} disabled={loading} className="register-button">
                    {loading ? 'Registering...' : 'Register for Event'}
                </button>
            )}
        </div>
    );
};

export default EventRegistration;
