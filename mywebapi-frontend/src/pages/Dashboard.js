import React from 'react';
import { Typography, Box, Container, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Welcome to the dashboard. Choose an option below:
        </Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'white', color: '#FFDAB9', border: '1px solid #FFDAB9' }}
              size="large"
              onClick={() => handleNavigate('/articles')}
              fullWidth
            >
              View Articles
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              sx={{ backgroundColor: 'white', color: '#FFDAB9', border: '1px solid #FFDAB9' }}
              size="large"
              onClick={() => handleNavigate('/questions')}
              fullWidth
            >
              View Questions
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
