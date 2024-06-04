


// New Changes on the Code

import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const REGISTER_URL = './api/users/register';

const Register = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrMsg('Passwords do not match');
      return;
    }
   
    try {
      const response = await axios.post(REGISTER_URL, {
        username: username,
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      });
      console.log(response.data);
      console.log(response.accessToken);
      setSuccess(true);
      setErrMsg('');
      // Clear form fields after successful registration
      setUsername('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrMsg('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        {success ? (
          <div>
            <Typography variant="body1" gutterBottom>
              Registration successful! <Link to="/login">Sign in</Link>
            </Typography>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              fullWidth
              margin="normal"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errMsg && <Typography variant="body2" style={{ color: 'red' }}>{errMsg}</Typography>}
            <Button variant="contained" color="primary" fullWidth type="submit">
              Register
            </Button>
          </form>
        )}
        <Typography variant="body1" style={{ marginTop: '20px', textAlign: 'center' }}>
          Have an Account?{' '}
          <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Sign In</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;

