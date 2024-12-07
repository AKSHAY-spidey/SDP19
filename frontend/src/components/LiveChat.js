import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LiveChat = ({ userName }) => {
    const { eventId } = useParams(); // Get eventId from URL parameters
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!eventId) {
                console.error('No eventId provided');
                return; // Exit if eventId is not available
            }
            setLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const response = await axios.get(`http://localhost:5001/events/${eventId}/messages`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setError('Failed to load messages. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();

        // Polling for new messages every 5 seconds
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [eventId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return; // Prevent sending empty messages

        try {
            const messageData = {
                userName: userName || 'Anonymous', // Use passed userName or default to 'Anonymous'
                content: newMessage
            };

            await axios.post(`http://localhost:5001/events/${eventId}/messages`, messageData);
            setNewMessage(''); // Clear input after sending
            setMessages((prevMessages) => [...prevMessages, messageData]);
            scrollToBottom();
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message. Please try again.');
            setNewMessage(''); // Clear input on error
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Live Chat</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                {loading ? (
                    <div>Loading messages...</div>
                ) : (
                    messages.map((msg, index) => (
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
            <div aria-live="polite" style ={{ visibility: 'hidden', height: '0' }}>
                {error && error}
            </div>
        </div>
    );
};

export default LiveChat;