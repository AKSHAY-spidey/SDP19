const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }, // Removed extra space
    isCancelled: { type: Boolean, default: false }
});

// Corrected model name
module.exports = mongoose.model('Event', eventSchema);