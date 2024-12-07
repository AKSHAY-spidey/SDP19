// frontend/src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth to access authentication context
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
    const { user, logout } = useAuth(); // Get user and logout function from context

    // Optional: Debugging line to confirm if the user is retrieved correctly
    console.log('Current user in Navbar:', user);

    // Handle logout functionality
    const handleLogout = () => {
        logout(); // Call logout function
    };

    // Check if the user is registered for any event
    const isRegisteredForEvent = user?.registeredEvents?.length > 0;

    useEffect(() => {
        // Optional: Can use this to check if user is fetched on first load (from localStorage)
        if (!user) {
            console.log("No user found in context, checking localStorage.");
        }
    }, [user]);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">MyApp</Link>
                <ul className="navbar-menu">
                    <li><Link to="/" className="navbar-item">Home</Link></li>
                    <li><Link to="/about" className="navbar-item">About</Link></li>
                    <li><Link to="/contact" className="navbar-item">Contact</Link></li>
                    <li><Link to="/events" className="navbar-item">Event List</Link></li>
                    {user ? (
                        <>
                            {isRegisteredForEvent && (
                                <>
                                    <li><Link to="/live-chat" className="navbar-item">Live Chat</Link></li>
                                    <li><Link to="/video-stream" className="navbar-item">Video Stream</Link></li>
                                </>
                            )}
                            {user.role === 'organizer' && (
                                <>
                                    <li><Link to="/events/new" className="navbar-item">Create Event</Link></li>
                                    <li><Link to="/manage-events" className="navbar-item">Manage Events</Link></li>
                                </>
                            )}
                            <li>
                                <button onClick={handleLogout} className="navbar-item" aria-label="Logout">
                                    Logout 
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="navbar-item">Login</Link></li>
                            <li><Link to="/register" className="navbar-item">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
