// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth to access authentication context
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
    const { user, logout } = useAuth(); // Get user and logout function from context

    console.log('Current user in Navbar:', user); // Debugging line

    const handleLogout = () => {
        logout(); // Call logout function
    };

    const isRegisteredForEvent = user?.registeredEvents?.length > 0;

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
                                    Logout </button>
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