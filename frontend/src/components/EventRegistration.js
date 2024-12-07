// frontend/src/components/EventRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext'; // Import useAuth to access authentication context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const EventRegistration = ({ eventId }) => {
    const { user, setUser  } = useAuth(); // Get user and setUser  function from context
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    // Check if the user is registered for the event
    const isRegistered = user && user.registeredEvents && user.registeredEvents.includes(eventId);

    const handleRegister = async () => {
        setLoading(true);
        try {
            const newRegistration = {
                id: Date.now().toString(), // Generate a unique ID for the registration
                eventId: eventId,
                userId: user.id
            };
            await axios.post(`http://localhost:5001/registrations`, newRegistration);
            toast.success('Registered for the event successfully!');
            // Update user state with registered events
            setUser (prevUser  => ({
                ...prevUser ,
                registeredEvents: [...prevUser .registeredEvents, eventId],
            }));
            // Redirect to Live Chat page
            navigate('/live-chat');
        } catch (error) {
            console.error('Error registering for event:', error);
            toast.error(error.response ? error.response.data.message : 'Failed to register for event');
        } finally {
            setLoading(false);
        }
    };

    const handleUnregister = async () => {
        setLoading(true);
        try {
            // Find the registration ID based on eventId and userId
            const registrationResponse = await axios.get(`http://localhost:5001/registrations?eventId=${eventId}&userId=${user.id}`);
            if (registrationResponse.data.length > 0) {
                const registrationId = registrationResponse.data[0].id; // Get the first matching registration ID
                await axios.delete(`http://localhost:5001/registrations/${registrationId}`);
                toast.success('Unregistered from the event successfully!');
                // Update user state to remove the event from registered events
                setUser (prevUser  => ({
                    ...prevUser ,
                    registeredEvents: prevUser .registeredEvents.filter(id => id !== eventId),
                }));
            } else {
                toast.error('No registration found to unregister.');
            }
        } catch (error) {
            console.error('Error unregistering from event:', error);
            toast.error(error.response ? error.response.data.message : 'Failed to unregister from event');
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