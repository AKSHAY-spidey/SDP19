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
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        } else {
            setError('No events found in local storage.');
        }
        setLoading(false);
    }, []); // Runs only once when component mounts

    const handleDelete = (eventId) => {
        const updatedEvents = events.filter(event => event.id !== eventId);
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents)); // Update localStorage
    };

    const handleModify = (eventId) => {
        navigate(`/events/edit/${eventId}`);
    };

    const handleCancel = (eventId) => {
        const updatedEvents = events.map(event =>
            event.id === eventId ? { ...event, status: 'canceled' } : event
        );
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents)); // Update localStorage
    };

    const handleRegister = (eventId) => {
        if (!user || user.role !== 'user') {
            alert('You must be logged in as a user to register for events.');
            return;
        }

        const updatedEvents = events.map(event =>
            event.id === eventId ? {
                ...event,
                participants: event.participants ? [...event.participants, user.id] : [user.id]
            } : event
        );
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents)); // Update localStorage
    };

    if (!user || user.role === 'organizer') {
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
                            {event.liveChatUrl && <p>Live Chat: <a href={event.liveChatUrl} target="_blank" rel="noopener noreferrer">Join Chat</a></p>}
                            {event.videoStreamUrl && <p>Video Stream: <a href={event.videoStreamUrl} target="_blank" rel="noopener noreferrer">Watch Live</a></p>}
                            {user && user.role === 'user' && (
                                <button onClick={() => handleRegister(event.id)} aria-label={`Register for event ${event.title}`}>Register</button>
                            )}
                            {user && user.role === 'organizer' && (
                                <>
                                    <button onClick={() => handleModify(event.id)} aria-label={`Modify event ${event.title}`}>Modify</button>
                                    <button onClick={() => handleDelete(event.id)} aria-label={`Delete event ${event.title}`}>Delete</button>
                                    <button onClick={() => handleCancel(event.id)} aria-label={`Cancel event ${event.title}`}>Cancel</button>
                                </>
                            )}
                        </li>
                    ))
                )}
            </ul>
            <Link to="/events/new">Create New Event</Link>
        </div>
    );
};

export default ManageEvents;
