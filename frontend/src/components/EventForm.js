// frontend/src/components/EventForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            // Fetch the event data to edit
            const fetchEvent = async () => {
                try {
                    const response = await axios.get(`http://localhost:5001/events/${eventId}`);
                    const { title, date, description, videoStreamUrl } = response.data; // Include videoStreamUrl
                    setTitle(title);
                    setDate(date);
                    setDescription(description);
                    setVideoStreamUrl(videoStreamUrl); // Set the video stream URL
                } catch (error) {
                    console.error('Error fetching event:', error);
                    toast.error('Failed to fetch event data.');
                }
            };
            fetchEvent();
        }
    }, [eventId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = { title, date, description, videoStreamUrl }; // Include videoStreamUrl

        setLoading(true); // Set loading state to true

        try {
            let response;
            if (eventId) {
                // Update the event
                response = await axios.put(`http://localhost:5001/events/${eventId}`, eventData);
                toast.success(`Event "${title}" updated successfully!`);
            } else {
                // Create a new event
                response = await axios.post('http://localhost:5001/events', eventData);
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
        if (error.response) {
            const errorMessage = error.response.data.message || 'Failed to save event';
            setError(`Error: ${errorMessage}`);
            toast.error(errorMessage);
        } else if (error.request) {
            setError('Error: No response from server');
            toast.error('Error: No response from server');
        } else {
            setError(`Error: ${error.message}`);
            toast.error(`Error: ${error.message}`);
        }
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
                        onChange={(e) => setDescription (e.target.value)}
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