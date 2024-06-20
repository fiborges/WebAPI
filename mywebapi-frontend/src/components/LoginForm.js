import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('Login failed');
      console.error(err);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
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
        <Button
          variant="contained"
          sx={{
            mt: 2,
            ml: 2,
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
      </Box>
    </Container>
  );
};

export default LoginForm;
