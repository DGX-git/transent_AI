import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Avatar,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

// Color Constants
const PRIMARY_BLUE = 'var(--primary-blue)';
const PRIMARY_BLUE_DARK = 'var(--primary-blue-dark)';
const PRIMARY_BLUE_DARKER = 'var(--primary-blue-darker)';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'Arohi',
    lastName: 'Kamble',
    email: 'arohikamble504@gmail.com',
    phone: '9876500000',
  });

  const [formData, setFormData] = useState(userData);

  const stats = [
    { 
      label: 'Files Processed', 
      value: '245',
      icon: <DescriptionIcon />,
      color: '#3b82f6',
      bgColor: '#eff6ff'
    },
    { 
      label: 'Transcriptions', 
      value: '156',
      icon: <AssessmentIcon />,
      color: '#8b5cf6',
      bgColor: '#f5f3ff'
    },
    { 
      label: 'Analyses', 
      value: '89',
      icon: <TrendingUpIcon />,
      color: '#ec4899',
      bgColor: '#fdf2f8'
    },
    { 
      label: 'Success Rate', 
      value: '98.5%',
      icon: <CheckCircleIcon />,
      color: '#10b981',
      bgColor: '#f0fdf4'
    },
  ];

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData(userData);
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarUpload = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        background: `linear-gradient(135deg, var(--bg-light) 0%, #e9ecef 100%)`, 
        minHeight: '90vh',
        py: 4 
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box className="back-button-container">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/UploadFiles')}
            className="back-button"
          >
            Back
          </Button>
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Profile Card - Left */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                backgroundColor: 'var(--bg-white)',
                border: '1px solid #f0f0f0',
              }}
            >
              {/* Avatar Section */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      background: 'linear-gradient(135deg, #084F82 0%, #0a6bb5 100%)',
                      fontSize: '36px',
                      fontWeight: 600,
                      boxShadow: '0 4px 16px rgba(8, 79, 130, 0.3)',
                    }}
                  >
                    {userData.firstName.charAt(0)}
                    {userData.lastName.charAt(0)}
                  </Avatar>
                 
                </Box>

                {!isEditing && (
                  <>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: '#1e293b', 
                        fontWeight: 700,
                        mb: 0.5
                      }}
                    >
                      {userData.firstName} {userData.lastName}
                    </Typography>
               
                    <Button
                      startIcon={<EditIcon />}
                      onClick={handleEditClick}
                      variant="outlined"
                      sx={{
                        borderColor: PRIMARY_BLUE,
                        color: PRIMARY_BLUE,
                        textTransform: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: PRIMARY_BLUE,
                          color: '#fff',
                          borderColor: '#084F82',
                        },
                      }}
                    >
                      Edit Profile
                    </Button>
                  </>
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Profile Information */}
              {isEditing ? (
                <Box>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Stack>

                  <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                      fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #084F82 0%, #0a6bb5 100%)',
                        color: '#fff',
                        textTransform: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        py: 1.2,
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(8, 79, 130, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #063d6b 0%, #084F82 100%)',
                          boxShadow: '0 6px 16px rgba(8, 79, 130, 0.4)',
                        },
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      fullWidth
                      sx={{
                        borderColor: PRIMARY_BLUE,
                        color: PRIMARY_BLUE,
                        textTransform: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        py: 1.2,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: '#f8fafc',
                          borderColor: '#cbd5e1',
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              ) : (
                <Stack spacing={2.5}>
                  {/* First Name */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <PersonIcon sx={{ color: '#64748b', fontSize: 20, mt: 0.5, mr: 1.5 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        sx={{ 
                          color: '#64748b', 
                          fontSize: '12px', 
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          mb: 0.5
                        }}
                      >
                        First Name
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: '#1e293b', 
                          fontSize: '15px', 
                          fontWeight: 600 
                        }}
                      >
                        {userData.firstName}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Last Name */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <PersonIcon sx={{ color: '#64748b', fontSize: 20, mt: 0.5, mr: 1.5 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        sx={{ 
                          color: '#64748b', 
                          fontSize: '12px', 
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          mb: 0.5
                        }}
                      >
                        Last Name
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: '#1e293b', 
                          fontSize: '15px', 
                          fontWeight: 600 
                        }}
                      >
                        {userData.lastName}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Email */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <EmailIcon sx={{ color: '#64748b', fontSize: 20, mt: 0.5, mr: 1.5 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        sx={{ 
                          color: '#64748b', 
                          fontSize: '12px', 
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          mb: 0.5
                        }}
                      >
                        Email Address
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: '#1e293b', 
                          fontSize: '15px', 
                          fontWeight: 600,
                          wordBreak: 'break-all'
                        }}
                      >
                        {userData.email}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Phone */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <PhoneIcon sx={{ color: '#64748b', fontSize: 20, mt: 0.5, mr: 1.5 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        sx={{ 
                          color: '#64748b', 
                          fontSize: '12px', 
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          mb: 0.5
                        }}
                      >
                        Phone Number
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: '#1e293b', 
                          fontSize: '15px', 
                          fontWeight: 600 
                        }}
                      >
                        {userData.phone}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              )}
            </Paper>
          </Grid>

          {/* Statistics - Right */}
          <Grid item xs={12} md={8}>
            <Box>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#1e293b', 
                    fontWeight: 700,
                    fontSize: '20px'
                  }}
                >
                  Activity Overview
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#64748b',
                    fontSize: '13px'
                  }}
                >
                  Last 30 days
                </Typography>
              </Box>

              <Grid container spacing={2.5}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        backgroundColor: 'var(--bg-white)',
                        border: '1px solid #f0f0f0',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              backgroundColor: stat.bgColor,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: stat.color,
                            }}
                          >
                            {stat.icon}
                          </Box>
                        </Box>
                        
                        <Typography 
                          sx={{ 
                            color: stat.color, 
                            fontSize: '32px', 
                            fontWeight: 800,
                            lineHeight: 1,
                            mb: 1
                          }}
                        >
                          {stat.value}
                        </Typography>
                        
                        <Typography 
                          sx={{ 
                            color: '#64748b', 
                            fontSize: '14px', 
                            fontWeight: 600,
                            letterSpacing: '0.3px'
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Avatar Upload Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleDialogClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        <DialogTitle sx={{ color: '#1e293b', fontWeight: 700, fontSize: '20px', pb: 1 }}>
          Upload Profile Picture
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Typography sx={{ color: '#64748b', fontSize: '14px', mb: 3, lineHeight: 1.6 }}>
            Choose a high-quality image for your profile. Supported formats include JPG, PNG, and GIF. Recommended size: 400x400 pixels.
          </Typography>
          <TextField
            fullWidth
            type="file"
            inputProps={{ accept: 'image/*' }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleDialogClose}
            sx={{ 
              color: '#64748b', 
              textTransform: 'none', 
              fontSize: '14px',
              fontWeight: 600,
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#f8fafc',
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{
              background: `linear-gradient(135deg, ${PRIMARY_BLUE} 0%, #0a6bb5 100%)`,
              color: '#fff',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 600,
              px: 3,
              py: 1,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(8, 79, 130, 0.3)',
              '&:hover': {
                background: `linear-gradient(135deg, ${PRIMARY_BLUE_DARKER} 0%, ${PRIMARY_BLUE} 100%)`,
                boxShadow: '0 6px 16px rgba(8, 79, 130, 0.4)',
              },
            }}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;