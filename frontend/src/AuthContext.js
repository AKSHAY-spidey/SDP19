// frontend/src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(() => {
        try {
            // Check localStorage for user data on initial load
            const savedUser  = localStorage.getItem('user');
            return savedUser  ? JSON.parse(savedUser ) : null; // Parse user data if it exists
        } catch (error) {
            console.error("Failed to parse user data from localStorage:", error);
            return null; // Return null if parsing fails
        }
    });

    const login = (userData) => {
        const newUser  = { ...userData, registeredEvents: [] }; // Set user data on login, initialize registeredEvents
        setUser (newUser );
        localStorage.setItem('user', JSON.stringify(newUser )); // Save user data to localStorage
    };

    const logout = () => {
        setUser (null); // Clear user data on logout
        localStorage.removeItem('user'); // Remove user data from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, setUser , login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};