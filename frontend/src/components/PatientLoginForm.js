// components/PatientLoginForm.js
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";

function PatientLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Track if registering or logging in

  const handleLogin = async () => {
    try {
      const response = await fetch("/patient/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // Upon successful login, redirect to patient appointments page
        window.location.href = "/patient-appointments";
      } else {
        const data = await response.json();
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("/patient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // Upon successful registration, automatically login
        handleLogin();
      } else {
        const data = await response.json();
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("An error occurred while registering. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isRegistering ? "Patient Registration" : "Patient Login"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {isRegistering ? (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleRegister}
              >
                Register
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="text"
              color="secondary"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PatientLoginForm;
