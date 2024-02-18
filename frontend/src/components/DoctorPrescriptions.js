// components/DoctorPrescriptions.js
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

function DoctorPrescriptions() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Make API request to backend to fetch patients based on doctor's location
    fetch('/doctor/patients')
      .then(response => response.json())
      .then(data => {
        setPatients(data.patients);
      })
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handlePrescribe = (patientId) => {
    // Logic to prescribe medication to the patient with patientId
    // You can implement this based on your backend logic
    console.log('Prescribing medication to patient with ID:', patientId);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Patients in Your Location</Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {patients.map((patient, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #ddd', marginBottom: 1 }}>
              <ListItemText primary={`Name: ${patient.name}`} secondary={`Location: ${patient.location}`} />
              <button onClick={() => handlePrescribe(patient.id)}>Prescribe</button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default DoctorPrescriptions;
