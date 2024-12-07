// frontend/src/components/CreateEvent.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const CreateEvent = () => {
    const { user } = useAuth();
    const [eventDetails, setEventDetails] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({ ...eventDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the event details to your backend
        console.log('Event Created:', eventDetails);
        // Reset form after submission
        setEventDetails({ title: '', date: '', location: '', description: '' });
    };

    if (!user || user.role !== 'organizer') {
        return <p>You do not have permission to create events.</p>;
    }

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={eventDetails.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={eventDetails.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Event Location"
                    value={eventDetails.location}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Event Description"
                    value={eventDetails.description}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;