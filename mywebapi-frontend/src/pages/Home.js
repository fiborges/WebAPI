import React from 'react';
import { Typography, Button, Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 2,
            p: 4,
            boxShadow: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to MyWebAPI
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Please login or register to access more features.
          </Typography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'white', color: '#ADD8E6', border: '1px solid #ADD8E6' }}
                size="large"
                onClick={() => handleNavigate('/login')}
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                sx={{ backgroundColor: 'white', color: '#ADD8E6', border: '1px solid #ADD8E6' }}
                size="large"
                onClick={() => handleNavigate('/register')}
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

