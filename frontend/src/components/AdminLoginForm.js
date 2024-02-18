// components/AdminLoginForm.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Grid } from '@mui/material';

function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Make API request to backend for admin login
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Upon successful login, redirect to appropriate page
        window.location.href = '/admin-dashboard'; // Navigate to admin dashboard
      } else {
        const data = await response.json();
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <div>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Admin Login</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>Login</Button>
      </div>
    </Paper>
  );
}

export default AdminLoginForm;
