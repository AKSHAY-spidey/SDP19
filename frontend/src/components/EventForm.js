import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Import toast for notifications
import { useParams, useNavigate } from 'react-router-dom';

const EventForm = () => {
    const { eventId } = useParams(); // Get event ID from URL if editing
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [videoStreamUrl, setVideoStreamUrl] = useState(''); // State for video stream URL
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        if (eventId) {
            // Fetch the event data to edit from localStorage
            const events = JSON.parse(localStorage.getItem('events')) || [];
            const event = events.find(event => event._id === eventId);

            if (event) {
                setTitle(event.title);
                setDate(event.date);
                setDescription(event.description);
                setVideoStreamUrl(event.videoStreamUrl);
            } else {
                toast.error('Event not found.');
            }
        }
    }, [eventId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = { title, date, description, videoStreamUrl, _id: eventId || new Date().getTime().toString() }; // Add a unique ID if creating a new event

        setLoading(true); // Set loading state to true

        try {
            const events = JSON.parse(localStorage.getItem('events')) || [];
            
            if (eventId) {
                // Update the event
                const updatedEvents = events.map(event =>
                    event._id === eventId ? eventData : event
                );
                localStorage.setItem('events', JSON.stringify(updatedEvents));
                toast.success(`Event "${title}" updated successfully!`);
            } else {
                // Create a new event
                events.push(eventData);
                localStorage.setItem('events', JSON.stringify(events));
                toast.success(`Event "${title}" created successfully!`);
            }

            // Clear event fields
            resetForm();

            // Redirect to manage events or another page
            navigate('/manage-events');
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const resetForm = () => {
        setTitle('');
        setDate('');
        setDescription('');
        setVideoStreamUrl(''); // Clear video stream URL field
        setError(''); // Clear any previous errors
    };

    const handleError = (error) => {
        console.error('Error saving event:', error);
        setError('Error: Failed to save event');
        toast.error('Error: Failed to save event');
    };

    return (
        <div>
            <nav>
                <ul>
                    <li onClick={() => navigate('/manage-events')}>Manage Events</li>
                    <li onClick={() => navigate('/create-event')}>Create Event</li>
                    {/* Add more navigation items as needed */}
                </ul>
            </nav>
            <h1>{eventId ? 'Edit Event' : 'Create New Event'}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Video Stream URL:</label>
                    <input
                        type="url"
                        value={videoStreamUrl}
                        onChange={(e) => setVideoStreamUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Event'}
                </button>
            </form>
        </div>
    );
};

export default EventForm;
