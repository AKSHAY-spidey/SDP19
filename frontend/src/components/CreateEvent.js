import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const CreateEvent = () => {
    const { user } = useAuth();
    const [eventDetails, setEventDetails] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        liveChatUrl: '', // New field for live chat URL
        videoStreamUrl: '' // New field for video stream URL
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({ ...eventDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save the event details (including URLs) to localStorage
        const storedEvents = localStorage.getItem('events');
        const events = storedEvents ? JSON.parse(storedEvents) : [];

        // Add the new event to the list
        const newEvent = {
            ...eventDetails,
            id: Date.now(), // Generate a unique ID for the event
            participants: [] // Initial empty participants list
        };

        // Save updated event list back to localStorage
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));

        // Reset form after submission
        setEventDetails({
            title: '',
            date: '',
            location: '',
            description: '',
            liveChatUrl: '',
            videoStreamUrl: ''
        });
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
                <input
                    type="url"
                    name="liveChatUrl"
                    placeholder="Live Chat URL"
                    value={eventDetails.liveChatUrl}
                    onChange={handleChange}
                />
                <input
                    type="url"
                    name="videoStreamUrl"
                    placeholder="Video Stream URL"
                    value={eventDetails.videoStreamUrl}
                    onChange={handleChange}
                />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
