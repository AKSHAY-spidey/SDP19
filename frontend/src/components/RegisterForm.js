// frontend/src/components/RegisterForm.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterForm.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { username, password, role }; // Include role in user data
    
        setLoading(true); // Set loading to true
    
        try {
            // Retrieve the existing users from localStorage (if any)
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
            // Check if the username already exists
            const userExists = existingUsers.some(user => user.username === username);
            if (userExists) {
                throw new Error('Username already exists. Please choose another one.');
            }
    
            // Save the new user to localStorage
            existingUsers.push(userData);
            localStorage.setItem('users', JSON.stringify(existingUsers));
    
            toast.success('Registration successful! You can now log in.');
            setUsername('');
            setPassword('');
            setRole('user'); // Reset role to default
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error(error.message || 'Failed to register');
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    

    return (
        <div className="register-form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="register-form">
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
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="user">User</option>
                        <option value="organizer">Organizer</option>
                    </select>
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
