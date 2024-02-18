// backend/controllers/patientController.js
const bcrypt = require('bcrypt');
const Patient = require('../models/Patient');

exports.registerPatient = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingPatient = await Patient.findOne({ username });

    if (existingPatient) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = new Patient({ username, password: hashedPassword });
    await newPatient.save();

    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginPatient = async (req, res) => {
  const { username, password } = req.body;

  try {
    const patient = await Patient.findOne({ username });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
