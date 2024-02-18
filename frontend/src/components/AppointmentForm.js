// components/AppointmentForm.js
import React, { useState } from 'react';
import { Button, Typography, Paper, Grid, TextField } from '@mui/material'; // Import TextField from MUI
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

function AppointmentForm() {
  const { currentUser } = useAuth(); // Access the authenticated user from AuthContext
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [issue, setIssue] = useState('');

  const handleSubmit = async () => {
    try {
      // Use currentUser.uid as the patient ID
      const response = await fetch('/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient: currentUser.uid,
          date,
          time,
          location,
          issue,
        }),
      });
      if (response.ok) {
        setDate('');
        setTime('');
        setLocation('');
        setIssue('');
        alert('Appointment scheduled successfully!');
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Appointment Submission Error:', error);
      alert('An error occurred while scheduling the appointment. Please try again.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <div>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Appointment Form</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>Submit</Button>
      </div>
    </Paper>
  );
}

export default AppointmentForm;
