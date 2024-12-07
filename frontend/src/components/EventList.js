// frontend/src/components/EventList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext'; // Import useAuth to access authentication context
import EventRegistration from './EventRegistration'; // Import the EventRegistration component

const EventList = () => {
    const { user } = useAuth(); // Get user from context
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5001/events'); // Fetch events from the server
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
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
                        <li key={event.id} className="event-item">
                            <h2>{event.name}</h2>
                            <p>{event.description}</p>
                            <p>Date: {new Date(event.date).toLocaleString()}</p>
                            {user && (
                                <EventRegistration eventId={event.id} />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventList;