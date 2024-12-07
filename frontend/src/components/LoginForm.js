// frontend/src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, password };

        setLoading(true); // Set loading to true

        try {
            // Keep the API endpoint as it is
            const response = await axios.post('http://localhost:5001/users', userData); 
            console.log('User  logged in successfully:', response.data);
            toast.success('Login successful!');
            login(response.data); // Call login function with user data from response
            setUsername('');
            setPassword('');
            navigate('/dashboard'); // Redirect to dashboard or another page
        } catch (error) {
            console.error('Error logging in:', error);
            // Improved error handling
            if (error.response) {
                // Server responded with a status other than 200 range
                const errorMessage = error.response.data.message || 'Failed to log in. Please check your credentials and try again.';
                toast.error(errorMessage);
            } else if (error.request) {
                // Request was made but no response was received
                toast.error('No response from server. Please try again later.');
            } else {
                // Something happened in setting up the request
                toast.error('Error: ' + error.message);
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="login-form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
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