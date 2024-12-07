import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext'; // Import useAuth to access authentication context
import EventRegistration from './EventRegistration'; // Import the EventRegistration component

const EventList = () => {
    const { user } = useAuth(); // Get user from context
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = () => {
            try {
                const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
                setEvents(storedEvents);
            } catch (error) {
                console.error('Error fetching events from localStorage:', error);
                toast.error('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading events...</div>;
    }

    return (
        <div className="event-list">
            <h1>Event List</h1>
            {events.length === 0 ? (
                <p>No events available.</p>
            ) : (
                <ul>
                    {events.map((event) => (
                        <li key={event._id} className="event-item">
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <p>Date: {new Date(event.date).toLocaleString()}</p>
                            {user && (
                                <EventRegistration eventId={event._id} />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventList;
