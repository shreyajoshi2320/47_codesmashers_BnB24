// backend/models/User.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
});

module.exports = mongoose.model('Admin', adminSchema);
