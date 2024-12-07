import React from 'react';
import LiveChat from './LiveChat';
import VideoStream from './VideoStream';
import { useParams } from 'react-router-dom';

const EventPage = () => {
    const { eventId } = useParams(); // Extract eventId from URL parameters
    console.log('Event ID:', eventId); // Debugging line

    if (!eventId) {
        return <div>Error: Event ID is required.</div>;
    }

    const streamUrl = `http://localhost:5001/events/${eventId}/stream`; // Example stream URL

    return (
        <div>
            <h1>Event Details</h1>
            <VideoStream streamUrl={streamUrl} />
            <LiveChat eventId={eventId} userName="YourUser  Name" />
        </div>
    );
};

export default EventPage;