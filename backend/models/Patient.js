// backend/models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
});

module.exports = mongoose.model('Patient', patientSchema);