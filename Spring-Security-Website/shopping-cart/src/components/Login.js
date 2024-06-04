


// Just Try New Code

import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Paper, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const LOGIN_URL = './api/users/login';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password: pwd }), {
        headers: { 'Content-Type': 'application/json' },
      });
      const { accessToken, roles } = response.data;

      if (Array.isArray(roles) && roles.length > 0) {
        const role = roles[0];
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('role', role.toUpperCase());

        if (role.toUpperCase() === 'CUSTOMER') {
          navigate('/customer');
        } else if (role.toUpperCase() === 'ADMIN') {
          navigate('/admin');
        } else if (role.toUpperCase() === 'SALES_MANAGER') {
          navigate('/sales-manager');
        } else {
          setErrMsg('Unknown role');
        }
      } else {
        setErrMsg('No roles found in response');
      }
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            autoComplete="current-password"
          />
          {errMsg && <Typography variant="body2" style={{ color: 'red' }}>{errMsg}</Typography>}
          <Button variant="contained" color="primary" fullWidth type="submit">
            Login
          </Button>
        </form>
        <Typography variant="body1" style={{ marginTop: '20px', textAlign: 'center' }}>
          Need an Account?{' '}
          <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Sign Up</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
