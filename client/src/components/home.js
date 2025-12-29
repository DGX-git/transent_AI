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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #084F82 0%, #42a5f5 100%)',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            color: '#fff',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                backgroundColor: '#fff',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  color: '#084F82',
                  fontSize: '36px',
                  fontWeight: 'bold',
                }}
              >
                TA
              </Typography>
            </Box>
          </Box>

          {/* Brand Name */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Transent AI
          </Typography>

          {/* Tagline */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              mb: 1,
              opacity: 0.95,
              fontSize: { xs: '1.25rem', md: '1.75rem' },
            }}
          >
            Transform Audio into Actionable Intelligence
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              mb: 6,
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.125rem' },
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            AI-powered transcription, sentiment analysis, and insights in seconds
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                backgroundColor: '#fff',
                color: '#084F82',
                fontSize: '18px',
                fontWeight: 600,
                textTransform: 'none',
                px: 6,
                py: 1.8,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                },
              }}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: '#fff',
                borderWidth: 2,
                color: '#fff',
                fontSize: '18px',
                fontWeight: 600,
                textTransform: 'none',
                px: 6,
                py: 1.8,
                borderRadius: 2,
                '&:hover': {
                  borderColor: '#fff',
                  borderWidth: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              Sign In
            </Button>
          </Box>

          {/* Footer Text */}
          <Typography
            variant="body2"
            sx={{
              mt: 8,
              opacity: 0.8,
              fontSize: '14px',
            }}
          >
            © 2025 Transent AI. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;