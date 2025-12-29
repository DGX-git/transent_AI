import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate, useLocation } from 'react-router-dom';  // Add this line

const TranscriptionResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transcribedFiles = location.state?.transcribedFiles || [];  // Add default empty array
  
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedFiles(transcribedFiles.map((_, index) => index));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleSelectFile = (index) => {
    if (selectedFiles.includes(index)) {
      setSelectedFiles(selectedFiles.filter(i => i !== index));
    } else {
      setSelectedFiles([...selectedFiles, index]);
    }
  };

  const handleStartSentimentAnalysis = () => {
    console.log('Starting sentiment analysis for:', selectedFiles);
  };

  const handleViewDetail = (file) => {
    console.log('View detail for:', file);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xlg">
        <Box
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: '#f5f7fa',
            borderRadius: 2,
            p: 4,
            minHeight: '70vh',
          }}
        >
          {/* Header with Back Button and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
               onClick={() => navigate('/transcription-results')}
              sx={{
                color: '#084F82',
                textTransform: 'none',
                fontSize: '18px',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              Back
            </Button>
            <Typography
              variant="h4"
              sx={{
                color: '#084F82',
                fontWeight: 600,
                flex: 1,
                textAlign: 'center',
                mr: 8,
              }}
            >
              Sentiment Analysis
            </Typography>
          </Box>


          {/* Transcription Table */}
          <Box>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: 'none', border: '1px solid #e5e7eb' }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#084F82' }}>
              
                    <TableCell
                      sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 2 }}
                    >
                      Sl No
                    </TableCell>
                    <TableCell
                      sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 2 }}
                    >
                      File Name
                    </TableCell>
                    <TableCell
                      sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 2 }}
                    >
                      Student Name
                    </TableCell>
                      <TableCell
                      sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 2 }}
                    >
                      Grade
                    </TableCell>
                    <TableCell
                      sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 2 }}
                    >
                      Analysis
                    </TableCell>
                  </TableRow>
                </TableHead>
               <TableBody>
  {transcribedFiles && transcribedFiles.length > 0 ? (
    transcribedFiles.map((file, index) => (
      // ... existing table row code ...
       <TableRow
                      key={index}
                      sx={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f3f4f6' }}
                    >
                      <TableCell sx={{ p: 2, textAlign: 'center' }}>
                        <Checkbox
                          sx={{
                            color: '#084F82',
                            '&.Mui-checked': { color: '#084F82' },
                          }}
                          checked={selectedFiles.includes(index)}
                          onChange={() => handleSelectFile(index)}
                        />
                      </TableCell>
                      <TableCell sx={{ p: 2, fontSize: '15px', color: '#111827' }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ p: 2, fontSize: '15px', color: '#111827' }}>
                        {file.fileName}
                      </TableCell>
                      <TableCell sx={{ p: 2, fontSize: '15px', color: '#111827' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            sx={{
                              fontSize: '15px',
                              color: '#111827',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '600px',
                            }}
                          >
                            {file.transcript}
                          </Typography>
                          <IconButton
                            onClick={() => handleViewDetail(file)}
                            sx={{ color: '#084F82', p: 0.5 }}
                          >
                            <InfoIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
    ))
  ) : (
        <TableRow>
      <TableCell colSpan={4} sx={{ textAlign: 'center', p: 4, color: '#666' }}>
        No transcription results available
      </TableCell>
    </TableRow>
  )}

                   
                  
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination Footer */}
            <Box
              sx={{
                backgroundColor: '#084F82',
                p: 1.5,
                px: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 3,
              }}
            >
              <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>
                Row per page: 5 ▼
              </Typography>
              <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>
                1-{transcribedFiles.length} of {transcribedFiles.length}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton sx={{ color: '#fff', p: 0.5 }}>
                  <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton sx={{ color: '#fff', p: 0.5 }}>
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Footer Note */}
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ color: '#ef4444', fontSize: '16px', fontWeight: 'bold' }}>
              *
            </Typography>
            <Typography sx={{ color: '#111827', fontSize: '14px' }}>
              Click on
            </Typography>
            <InfoIcon sx={{ color: '#084F82', fontSize: '18px' }} />
            <Typography sx={{ color: '#111827', fontSize: '14px' }}>
              button to view detail.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TranscriptionResults;