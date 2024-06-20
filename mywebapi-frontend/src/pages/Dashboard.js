import React from 'react';
import { Container, Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/background.jpg'; // Certifique-se de que a imagem de fundo esteja no caminho correto

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Esta linha fixa a imagem de fundo
        padding: '20px'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#444', fontFamily: 'Montserrat, sans-serif' }}
        >
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/articles')}
            sx={{
              backgroundColor: '#AEDFF7',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: '#9CD1F3',
              },
              padding: '12px 25px',
              borderRadius: '8px',
              transition: 'background-color 0.3s'
            }}
          >
            View Articles
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/questions')}
            sx={{
              backgroundColor: '#AEDFF7',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: '#9CD1F3',
              },
              padding: '12px 25px',
              borderRadius: '8px',
              transition: 'background-color 0.3s'
            }}
          >
            View Questions
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{
              mt: 2,
              color: '#AEDFF7',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
              borderColor: '#AEDFF7',
              '&:hover': {
                backgroundColor: '#E0FFFF',
              },
              padding: '12px 25px',
              borderRadius: '8px',
              transition: 'background-color 0.3s'
            }}
          >
            Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
