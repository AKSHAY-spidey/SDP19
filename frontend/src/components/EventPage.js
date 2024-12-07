import React, { useEffect, useState } from 'react';
import LiveChat from './LiveChat'; // Importing the LiveChat component
import VideoStream from './VideoStream'; // Importing the VideoStream component
import { useParams } from 'react-router-dom'; // Hook to access URL parameters

const EventPage = () => {
    const { eventId } = useParams(); // Extract eventId from the URL parameters
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        // Check if event data is stored in local storage
        const storedEventData = localStorage.getItem(`event-${eventId}`);
        if (storedEventData) {
            // Parse stored event data and set it to state
            setEventData(JSON.parse(storedEventData));
        } else {
            // If event data is not in local storage, set an error or handle this case
            setEventData(null);
        }
    }, [eventId]);

    if (!eventId) {
        return <div>Error: Event ID is required.</div>; // Handle the case where eventId is not found
    }

    if (!eventData) {
        return <div>Loading event details from local storage...</div>; // Fallback if no data found in local storage
    }

    // Assuming eventData contains streamUrl and other relevant information
    const { streamUrl } = eventData;

    return (
        <div>
            <h1>Event Details</h1>
            <VideoStream streamUrl={streamUrl} />  {/* Pass stream URL to VideoStream component */}
            <LiveChat eventId={eventId} userName="YourUser Name" />  {/* Pass eventId and username to LiveChat */}
        </div>
    );
};

export default EventPage;
