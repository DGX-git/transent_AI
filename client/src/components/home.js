import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box className="home-container">
      <Container maxWidth="md">
        <Box className="home-content-wrapper">
          {/* Logo */}
          <Box className="home-logo-container">
            <Box className="home-logo-box">
              <Typography className="home-logo-text">
                TA
              </Typography>
            </Box>
          </Box>

          {/* Brand Name */}
          <Typography
            variant="h3"
            className="home-brand-title"
          >
            Transent AI
          </Typography>

          {/* Tagline */}
          <Typography
            variant="h5"
            className="home-tagline"
          >
            Transform Audio into Actionable Intelligence
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            className="home-description"
          >
            AI-powered transcription, sentiment analysis, and insights in seconds
          </Typography>

          {/* CTA Buttons */}
          <Box className="home-cta-container">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              className="home-start-button"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              className="home-learn-button"
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;