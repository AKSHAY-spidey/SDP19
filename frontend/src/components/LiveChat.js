import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const LiveChat = ({ userName }) => {
    const { eventId } = useParams(); // Get eventId from URL parameters
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    // Load messages from localStorage when the component mounts
    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem(`event_${eventId}_messages`)) || [];
        setMessages(storedMessages);
    }, [eventId]);

    // Scroll to the bottom of the chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Handle sending a message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return; // Prevent sending empty messages

        const messageData = {
            userName: userName || 'Anonymous', // Use passed userName or default to 'Anonymous'
            content: newMessage,
            timestamp: new Date().toISOString() // Add timestamp for sorting
        };

        // Update localStorage and messages state
        const updatedMessages = [...messages, messageData];
        setMessages(updatedMessages);
        localStorage.setItem(`event_${eventId}_messages`, JSON.stringify(updatedMessages));

        setNewMessage(''); // Clear input after sending
        scrollToBottom(); // Scroll to the bottom of the chat
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Live Chat</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                {messages.length === 0 ? (
                    <div>No messages yet. Be the first to send a message!</div>
                ) : (
                    messages
                        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // Sort messages by timestamp
                        .map((msg, index) => (
                            <div key={index}>
                                <strong>{msg.userName}:</strong> {msg.content}
                            </div>
                        ))
                )}
                <div ref={messagesEndRef} /> {/* Scroll reference */}
            </div>
            <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    required
                    style={{ flex: 1, marginRight: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    aria-label="Message input"
                />
                <button type="submit" style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default LiveChat;
