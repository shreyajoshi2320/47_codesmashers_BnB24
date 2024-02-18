// backend/controllers/patient2-controller.js
const Patient2 = require("../models/Patient2");

exports.registerPatient = async (req, res) => {
  const { username, phoneno, pincode, district } = req.body;

  try {
    const existingPatient = await Patient2.findOne({ username });

    if (existingPatient) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const newPatient = new Patient2({ username, phoneno, pincode, district });
    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.loginPatient = async (req, res) => {
    const { username} = req.body;
  
    try {
      const patient = await Patient2.findOne({ username });
  
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  