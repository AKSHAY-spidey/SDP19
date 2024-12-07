// backend/routes/userRoutes.js
const express = require('express');
const { getUserProfile, registerForEvent, unregisterFromEvent } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.post('/register-event', verifyToken, registerForEvent);
router.post('/unregister-event', verifyToken, unregisterFromEvent);

module.exports = router;