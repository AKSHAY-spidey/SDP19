const express = require('express');
const { getEventMessages, createMessage } = require('../controllers/eventController');
const router = express.Router();

router.get('/:eventId/messages', getEventMessages);
router.post('/:eventId/messages', createMessage);

module.exports = router;