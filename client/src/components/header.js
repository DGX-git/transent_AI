import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  ClickAwayListener,
  Avatar,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Header = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);

  const handleProfileClick = () => {
    setShowProfileCard(!showProfileCard);
  };

  const handleClickAway = () => {
    setShowProfileCard(false);
  };

  const handleMyProfileClick = () => {
    console.log('My Profile clicked');
    setShowProfileCard(false);
  };

  const handleLogoutClick = () => {
    console.log('Logout clicked');
    setShowProfileCard(false);
  };

  return (
    <AppBar position="static" className="header-appbar">
      <Toolbar className="toolbar">
        {/* Logo and Brand Name */}
        <Box className="logo-container">
          <Box className="logo-outer">
            <Box className="logo-inner">
              <Typography className="logo-text">
                TA
              </Typography>
            </Box>
          </Box>
          <Typography variant="h5" className="brand-name">
            Transent AI
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box className="nav-buttons">
          <Button
            startIcon={<HomeIcon />}
            className="home-button"
          >
            Home
          </Button>
          
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box className="profile-button-container">
              <Button
                endIcon={<KeyboardArrowDownIcon />}
                className="account-button"
                onClick={handleProfileClick}
              >
                <PersonIcon className="account-icon" />
                Account
              </Button>
              
              {showProfileCard && (
                <Card className="profile-dropdown-card">
                  <CardContent className="profile-dropdown-content">
                    {/* User Info Section */}
                    <Box className="user-info-section">
                      <Avatar className="user-avatar">
                        
                      </Avatar>
                      <Box className="user-details">
                        <Typography className="user-name">
                          User Name
                        </Typography>
                        <Typography className="user-email">
                          user@gmail.com
                        </Typography>
                      </Box>
                    </Box>

                    <Divider className="profile-divider" />

                    {/* Menu Options */}
                    <Box className="menu-options">
                      <Button
                        startIcon={<PersonIcon />}
                        className="menu-option-button"
                        onClick={handleMyProfileClick}
                      >
                        My Profile
                      </Button>
                      
                      <Button
                        startIcon={<LogoutIcon />}
                        className="menu-option-button logout-button"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
          </ClickAwayListener>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;