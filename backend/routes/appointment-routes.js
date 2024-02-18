// backend/routes/appointments-routes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment-controller');

// Routes for appointment-related operations
router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
