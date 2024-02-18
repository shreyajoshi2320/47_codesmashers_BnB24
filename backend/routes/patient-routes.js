// backend/routes/patient-routes.js
const express = require('express');
const patientRouter = express.Router();
const patientController = require('../controllers/patient-controller');

// Patient login route
patientRouter.post('/register', patientController.registerPatient);
patientRouter.post('/login', patientController.loginPatient);

module.exports = patientRouter;

