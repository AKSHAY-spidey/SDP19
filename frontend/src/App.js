import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer for notifications
import { AuthProvider } from './AuthContext'; // Import AuthProvider to provide authentication context

// Import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ManageEvents from './components/ManageEvents';
import LiveChat from './components/LiveChat';
import VideoStream from './components/VideoStream';
import EventPage from './components/EventPage';
import NotFound from './components/NotFound';

// Import styles
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <AuthProvider> {/* Wrap the application with AuthProvider */}
            <Router>
                <Navbar /> {/* Use the Navbar component here */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/events" element={<EventList />} />
                    <Route path="/events/new" element={<EventForm />} /> {/* Route for creating a new event */}
                    <Route path="/events/edit/:eventId" element={<EventForm />} /> {/* Route for editing an event */}
                    <Route path="/events/:eventId" element={<EventPage />} /> {/* Route for viewing a specific event */}
                    <Route path="/manage-events" element={<ManageEvents />} /> {/* Route for managing events */}
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/live-chat/:eventId" element={<LiveChat />} /> {/* Route for live chat with eventId */}
                    <Route path="/video-stream/:eventId" element={<VideoStream />} /> {/* Route for video stream with eventId */}
                    <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 errors */}
                </Routes>
                <ToastContainer /> {/* Add ToastContainer for notifications */}
            </Router>
        </AuthProvider>
    );
};

export default App;