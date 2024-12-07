// frontend/src/components/ManageEvents.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const ManageEvents = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5001/events');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Failed to load events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:5001/events/${eventId}`, { method: 'DELETE' });
            if (!response.ok ) {
                throw new Error('Network response was not ok');
            }
            setEvents(events.filter(event => event.id !== eventId));
            console.log(`Event with ID ${eventId} deleted.`);
        } catch (error) {
            console.error('Error deleting event:', error);
            setError('Failed to delete event. Please try again later.');
        }
    };

    const handleModify = (eventId) => {
        navigate(`/events/edit/${eventId}`);
    };

    const handleCancel = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:5001/events/${eventId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'canceled' })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setEvents(events.map(event => 
                event.id === eventId ? { ...event, status: 'canceled' } : event
            ));
            console.log(`Event with ID ${eventId} canceled.`);
        } catch (error) {
            console.error('Error canceling event:', error);
            setError('Failed to cancel event. Please try again later.');
        }
    };

    if (!user || user.role !== 'organizer') {
        return <p>You do not have permission to manage events.</p>;
    }

    return (
        <div>
            <h2>Manage Events</h2>
            {loading && <p>Loading events...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {events.length === 0 ? (
                    <p>No events available.</p>
                ) : (
                    events.map(event => (
                        <li key={event.id}>
                            <h3>{event.title}</h3>
                            <p>{event.date} - {event.location}</p>
                            <p>{event.description}</p>
                            <p>Status: {event.status || 'active'}</p>
                            <button onClick={() => handleModify(event.id)} aria-label={`Modify event ${event.title}`}>Modify</button>
                            <button onClick={() => handleDelete(event.id)} aria-label={`Delete event ${event.title}`}>Delete</button>
                            <button onClick={() => handleCancel(event.id)} aria-label={`Cancel event ${event.title}`}>Cancel</button>
                        </li>
                    ))
                )}
            </ul>
            <Link to="/events/new">Create New Event</Link>
        </div>
    );
};

export default ManageEvents;