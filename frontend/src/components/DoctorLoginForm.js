// components/DoctorLoginForm.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Paper } from '@mui/material';

function DoctorLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Track if registering or logging in

  const handleLogin = async () => {
    try {
      const response = await fetch('/doctor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // Upon successful login, redirect to doctor prescriptions page
        window.location.href = '/doctor-prescriptions';
      } else {
        const data = await response.json();
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('/doctor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, location }),
      });
      if (response.ok) {
        // Upon successful registration, automatically login
        handleLogin();
      } else {
        const data = await response.json();
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <div>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Doctor {isRegistering ? 'Registration' : 'Login'}</Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {isRegistering && (
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        )}
        {isRegistering ? (
          <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>Register</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>Login</Button>
        )}
        <Button
          fullWidth
          variant="text"
          color="secondary"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
        </Button>
      </div>
    </Paper>
  );
}

export default DoctorLoginForm;