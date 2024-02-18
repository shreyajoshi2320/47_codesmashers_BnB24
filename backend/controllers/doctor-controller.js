// backend/controllers/doctorController.js
const bcrypt = require('bcrypt');
const Doctor = require('../models/Doctor');

exports.registerDoctor = async (req, res) => {
  const { username, password, location } = req.body;

  try {
    const existingDoctor = await Doctor.findOne({ username });

    if (existingDoctor) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new Doctor({ username, password: hashedPassword, location });
    await newDoctor.save();

    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginDoctor = async (req, res) => {
  const { username, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ username });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getDoctorAppointments = async (req, res) => {
    try {
      // Assuming you have a way to identify the doctor, like a doctor ID stored in req.user
      const doctorId = req.user.id; // Assuming you have stored the doctor ID in the request object after authentication
  
      // Find all appointments associated with the doctor
      const appointments = await Appointment.find({ doctorId });
  
      res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
