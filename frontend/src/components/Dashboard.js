import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('/api/events');
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {events.map(event => (
                    <li key={event._id}>{event.title} - {event.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;