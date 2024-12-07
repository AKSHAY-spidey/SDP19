import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Get events from localStorage
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents);
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
