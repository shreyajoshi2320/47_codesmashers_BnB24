// backend/controllers/admin-controller.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const Appointment = require('../models/Appointment');


const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingAdmin;

  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin Already Exists" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  let admin;
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  
  return res.status(201).json({ message: "Admin created", admin: admin });
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!existingAdmin) {
    return res.status(401).json({ message: "Admin not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return res.status(200).json({
    message: "Authentication Successful",
    token,
    id: existingAdmin._id,
  });
};

const getAdmins = async (req, res) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(200).json({ admins });
};

const getAdminByID = async (req, res, next) => {
  const id = req.params.id;

  if (id === "null") {
    return res.status(400).json({ message: 'Invalid ID: "null"' });
  }

  let admin;
  try {
    admin = await Admin.findById(id).populate("addedMovies");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  return res.status(200).json({ admin });
};


const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient doctor');
    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addAdmin, adminLogin, getAdmins, getAdminByID, getAllAppointments};
