// backend/models/Patient.js
const mongoose = require('mongoose');

const patientSchema2 = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    phoneno: { type: Number, required: true, unique: true},
    pincode: { type: Number, required: true},
    district: { type: String, required: true}
});

module.exports = mongoose.model('Patient2', patientSchema2);