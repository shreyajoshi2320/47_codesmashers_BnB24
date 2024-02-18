// backend/routes/patient-routes.js
const express = require('express');
const patient2Router = express.Router();
const patientController = require('../controllers/patient2-controller');

// Patient login route
patient2Router.post('/register', patientController.registerPatient);
patient2Router.post('/login', patientController.loginPatient);

module.exports = patient2Router;