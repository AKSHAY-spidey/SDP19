import React, { useState, useEffect } from 'react';

const VideoStream = ({ streamUrl }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // Reset loading and error states when streamUrl changes
        setIsLoading(true);
        setHasError(false);
    }, [streamUrl]);

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div>
            <h2>Live Video Stream</h2>
            {isLoading && <p>Loading video stream...</p>}
            {hasError && <p style={{ color: 'red' }}>Error loading video stream. Please try again later.</p>}
            <video
                src={streamUrl}
                controls
                autoPlay
                onLoadedData={() => setIsLoading(false)} // Set loading to false when video is ready
                onError={handleError} // Handle error if video fails to load
                style={{ width: '100%', height: 'auto' }}
            />
        </div>
    );
};

export default VideoStream;