// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLoginForm from "./components/AdminLoginForm";
import PatientLoginForm from "./components/PatientLoginForm";
import DoctorLoginForm from "./components/DoctorLoginForm";
import AppointmentForm from "./components/AppointmentForm";
import PatientAppointments from "./components/PatientAppointments";
import DoctorPrescriptions from "./components/DoctorPrescriptions";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLoginForm />} />
          <Route path="/patient" element={<PatientLoginForm />} />
          <Route path="/patient2" element={<PatientLoginForm />} />
          <Route path="/doctor" element={<DoctorLoginForm />} />
          <Route path="/appointment-form" element={<AppointmentForm />} />
          <Route
            path="/patient-appointments"
            element={<PatientAppointments />}
          />
          <Route
            path="/doctor-prescriptions"
            element={<DoctorPrescriptions />}
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
