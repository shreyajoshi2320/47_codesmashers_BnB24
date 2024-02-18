// backend/routes/doctor-routes.js
const express = require('express');
const doctorRouter = express.Router();
const doctorController = require('../controllers/doctor-controller');

// Doctor login route
doctorRouter.post('/login', doctorController.loginDoctor);
doctorRouter.post('/register', doctorController.registerDoctor);

module.exports = doctorRouter;
