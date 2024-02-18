// components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Typography, Container, Button, List, ListItem, ListItemText } from '@mui/material';

function AdminDashboard() {
  // State to store the list of appointments
  const [appointments, setAppointments] = useState([]);

  // Function to fetch appointments data from the backend
  const fetchAppointments = async () => {
    try {
      const response = await fetch('/admin/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // useEffect to fetch appointments data on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic
    // Redirect to admin login page
    window.location.href = '/admin';
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout} sx={{ marginBottom: 2 }}>
        Logout
      </Button>
      <Typography variant="h5" gutterBottom>
        Appointments
      </Typography>
      <List>
        {appointments.map((appointment, index) => (
          <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
            <ListItemText
              primary={`Patient: ${appointment.patientName}`}
              secondary={`Date: ${appointment.date}, Time: ${appointment.time}, Location: ${appointment.location}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default AdminDashboard;
