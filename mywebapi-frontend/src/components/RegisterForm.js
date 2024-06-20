import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
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
      }, 3000); // Redireciona para a página de login após 3 segundos
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err.response ? err.response.data : err.message); // Log detalhado do erro
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
      {success && (
        <Typography color="primary" sx={{ mt: 2 }}>
          Registration successful! Redirecting to login...
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
        Register
      </Button>
      <Button
        variant="contained"
        sx={{
          mt: 2,
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
  );
};

export default RegisterForm;
