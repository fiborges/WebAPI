import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await registerApi(username, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  const handleBackClick = () => {
    navigate('/');
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
        Register
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
        margin="normal"
        InputProps={{
          style: { color: '#3C3C3C' }
        }}
        InputLabelProps={{
          style: { color: '#3C3C3C' }
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
          style: { color: '#3C3C3C' }
        }}
        InputLabelProps={{
          style: { color: '#3C3C3C' }
        }}
      />
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="primary" sx={{ mt: 2 }}>
          Registration successful! Redirecting to login...
        </Typography>
      )}
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#ADD8E6',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: '#87CEEB',
            },
          }}
        >
          Register
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#87CEEB',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: '#ADD8E6',
            },
          }}
          onClick={handleBackClick}
        >
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
