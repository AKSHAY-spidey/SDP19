const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'organizer'], default: 'user' },
    eventsRegistered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

// Corrected model name
module.exports = mongoose.model('User ', userSchema);