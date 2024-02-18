// backend/controllers/appointmentController.js
const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  try {
    const { patient: patientId, date, time, location, issues } = req.body;

    // Validate that patient ID, doctor, date, time, and location are present
    if (!patientId || !doctor || !date || !time || !location || !issues) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the appointment record in the database
    const appointment = await Appointment.create({
      patient: patientId,
      doctor,
      date,
      time,
      location,
      issues,
    });

    // Respond with the created appointment
    res.status(201).json({ appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { patientName, date, time } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { patientName, date, time, location, issues },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
