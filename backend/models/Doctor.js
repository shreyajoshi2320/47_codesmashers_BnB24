// backend/models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true},
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
});

module.exports = mongoose.model('Doctor', doctorSchema);