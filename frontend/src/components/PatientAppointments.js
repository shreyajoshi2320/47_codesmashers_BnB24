// components/PatientAppointments.js
import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
} from "@mui/material";

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Make API request to backend to fetch patient appointments
    // Update state with fetched appointments
    const fetchedAppointments = []; // Replace with fetched appointments
    setAppointments(fetchedAppointments);
  }, []);

  const handleScheduleAppointment = () => {
    // Redirect to appointment form
    window.location.href = "/appointment-form";
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Your Appointments
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        {appointments.length > 0 ? (
          <List>
            {appointments.map((appointment, index) => (
              <ListItem
                key={index}
                sx={{ borderBottom: "1px solid #ddd", marginBottom: 1 }}
              >
                <ListItemText
                  primary={`Doctor: ${appointment.doctorName}`}
                  secondary={`Date: ${appointment.date}, Time: ${appointment.time}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No appointments scheduled.</Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleScheduleAppointment}
          sx={{ marginTop: 2 }}
        >
          Schedule Appointment
        </Button>
      </Paper>
    </div>
  );
}

export default PatientAppointments;
