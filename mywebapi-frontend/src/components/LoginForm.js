import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginApi(username, password);
      if (response && response.token) {
        const token = response.token;
        localStorage.setItem('token', token);
        login();
        navigate('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err.response ? err.response.data : err.message); // Log detalhado do erro
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
        margin="normal"
        InputProps={{
          style: { color: '#3C3C3C' } // Cor do texto de entrada
        }}
        InputLabelProps={{
          style: { color: '#3C3C3C' } // Cor do rótulo do campo de entrada
        }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        InputProps={{
          style: { color: '#3C3C3C' } // Cor do texto de entrada
        }}
        InputLabelProps={{
          style: { color: '#3C3C3C' } // Cor do rótulo do campo de entrada
        }}
      />
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: '#ADD8E6',
          color: 'white',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#87CEEB',
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
