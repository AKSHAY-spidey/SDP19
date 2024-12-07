const express = require('express');
const { createEvent, modifyEvent, deleteEvent, cancelEvent, getEvents } = require('../controllers/eventController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, createEvent);
router.put('/:id', verifyToken, modifyEvent);
router.delete('/:id', verifyToken, deleteEvent);
router.patch('/:id/cancel', verifyToken, cancelEvent);
router.get('/', getEvents);

module.exports = router;