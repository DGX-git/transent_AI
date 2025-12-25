import React from 'react';
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  return (
    <AppBar position="static" className="header-appbar">
      <Toolbar className="toolbar">
        {/* Logo and Brand Name */}
        <Box className="logo-container">
          <Box className="logo-outer">
            <Box className="logo-inner">
              <Typography className="logo-text">
                VI
              </Typography>
            </Box>
          </Box>
          <Typography variant="h5" className="brand-name">
            VoiceIntel
          </Typography>
        </Box>

        {/* Profile Button */}
        <Button
          startIcon={<HomeIcon />}
          className="profile-button"
        >
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;