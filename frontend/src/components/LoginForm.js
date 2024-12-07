// frontend/src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginForm.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useAuth } from '../AuthContext'; // Import useAuth to access authentication context

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate(); // Hook for navigation
    const { login } = useAuth(); // Get login function from context

    // Effect to check for a logged-in user on component mount
    useEffect(() => {
        const loggedUser = localStorage.getItem('user'); // Retrieve user data from localStorage
        if (loggedUser) {
            // If user data exists, navigate to dashboard directly
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Retrieve users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
        // Find a user matching the entered username and password
        const foundUser = existingUsers.find(
            (user) => user.username === username && user.password === password
        );
    
        if (foundUser) {
            toast.success('Login successful!');
            localStorage.setItem('user', JSON.stringify(foundUser)); // Store the logged-in user in localStorage
            login(foundUser); // Call login function with found user
            setUsername('');
            setPassword('');
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } else {
            toast.error('Invalid username or password. Please try again.');
        }
    };
    

    return (
        <div className="login-form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">User name:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        aria-describedby="usernameHelp"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-describedby="passwordHelp"
                    />
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
