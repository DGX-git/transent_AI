import React, { useEffect, useState } from 'react';
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const AudioConverter = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [status, setStatus] = useState([]);
    const navigate = useNavigate();


     // API call for fetch roles.
  const fetchStatus = async () => {
    try {
      const response = await fetch(
        // process.env.NEXT_PUBLIC_DGX_API_URL + "/uploadedFiles/getFiles"
        "http://localhost:5000/uploadedFiles/getFiles"
      );
      const data = await response.json();
    
      if (data) {
        setStatus(data ?? []);

      }
    } catch (err) {
      console.error("Error fetching master tables", err);
    }
  };
  useEffect(() => {
    fetchStatus();
  }, []);
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    
    const newFiles = files.map((file, index) => {
      const audio = new Audio();
      const objectUrl = URL.createObjectURL(file);
      audio.src = objectUrl;
      
      return new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', () => {
          const duration = audio.duration;
          const minutes = Math.floor(duration / 60);
          const seconds = Math.floor(duration % 60);
          const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
          
          resolve({
            id: Date.now() + index,
            name: file.name.replace(/\.[^/.]+$/, ''),
            type: file.name.split('.').pop().toUpperCase(),
            size: formatFileSize(file.size),
            duration: formattedDuration,
            file: file,
          });
          
          URL.revokeObjectURL(objectUrl);
        });
      });
    });

    Promise.all(newFiles).then((resolvedFiles) => {
      setUploadedFiles([...uploadedFiles, ...resolvedFiles]);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleDelete = (id) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
    setSelectedFiles(selectedFiles.filter(fileId => fileId !== id));
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedFiles(uploadedFiles.map(file => file.id));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleSelectFile = (id) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter(fileId => fileId !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  };

  const handleStartTranscription = () => {
    console.log('Starting transcription for files:', selectedFiles);
    
    // Navigate to transcription results page
    navigate('/transcription-results', { 
      state: { 
        transcribedFiles: uploadedFiles.filter(file => selectedFiles.includes(file.id))
      } 
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xlg">
        {/* Title and Upload Section */}
        <Box
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: '#f5f7fa',
            borderRadius: 2,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#084F82',
              fontWeight: 600,
              mb: 2,
              textAlign: 'center',
            }}
          >
            Audio to Text Converter
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#6b7280',
              mb: 2,
              textAlign: 'center',
              fontWeight: 400,
            }}
          >
            audio to intelligence: transcripts, entities, and sentiment in one place.
          </Typography>

          <Box
            sx={{
              border: '2px solid #d1d5db',
              borderRadius: 2,
              p: 2,
              backgroundColor: '#fff',
              minWidth: '300px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <input
              type="file"
              accept="audio/*"
              multiple
              style={{ display: 'none' }}
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon sx={{ fontSize: '20px' }} />}
                sx={{
                  backgroundColor: '#f3e8d0',
                  color: '#000',
                  fontSize: '20px',
                  fontWeight: 600,
                  textTransform: 'none',
                  py: 2,
                  px: 4,
                  borderRadius: 2,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#e8dcc0',
                    boxShadow: 'none',
                  },
                }}
              >
                Upload Files
              </Button>
            </label>
          </Box>

     
        </Box>
             {uploadedFiles.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleStartTranscription}
                // disabled={selectedFiles.length === 0}
                sx={{
                  backgroundColor: '#084F82',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 600,
                  textTransform: 'none',
                  py: 1.5,
                  px: 4,
                  mb: 0.5,
                  borderRadius: 2,
                  boxShadow: 'none',
                     '&:hover': {
                  backgroundColor: '#063d6b',
                },
                '&:disabled': {
                  backgroundColor: '#ccc',
                  color: '#666',
                }
                }}
              >
                Start Transcription
              </Button>
            </Box>
          )}

        {/* Files Table */}
        {uploadedFiles.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e5e7eb' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#084F82' }}>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 1, width: 60, textAlign: 'center' }}>
                      <Checkbox
                        sx={{ color: '#fff', '&.Mui-checked': { color: '#fff', p: 0 } }}
                        checked={selectedFiles.length === uploadedFiles.length}
                        indeterminate={selectedFiles.length > 0 && selectedFiles.length < uploadedFiles.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 2 }}>Sl No</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 2 }}>File Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 2 }}>File Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 2 }}>Size</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 2 }}>Duration</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: '16px', p: 2 }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {uploadedFiles.map((file, index) => (
                    <TableRow 
                      key={file.id}
                      sx={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f3f4f6' }}
                    >
                      <TableCell sx={{ p: 2, textAlign: 'center' }}>
                        <Checkbox
                          sx={{ color: '#084F82', '&.Mui-checked': { color: '#084F82' } }}
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => handleSelectFile(file.id)}
                        />
                      </TableCell>
                      <TableCell sx={{ p: 2, fontSize: '15px', color: '#111827' }}>{index + 1}</TableCell>
                      <TableCell sx={{ p: 2, fontSize: '15px', color: '#111827' }}>{file.name}</TableCell>
                      <TableCell sx={{ p: 2, fontSize: '15px', color: '#111827' }}>{file.type}</TableCell>
                      <TableCell sx={{ p: 2, fontSize: '15px', color: '#111827' }}>{file.size}</TableCell>
                      <TableCell sx={{ p: 2, fontSize: '15px', color: '#111827' }}>{file.duration}</TableCell>
                      <TableCell sx={{ p: 2 }}>
                        <IconButton
                          onClick={() => handleDelete(file.id)}
                          sx={{ color: '#111827', p: 1 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
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
                1-{uploadedFiles.length} of {uploadedFiles.length}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button sx={{ minWidth: 36, height: 36, color: '#fff', fontSize: '18px', p: 0 }}>‹</Button>
                <Button sx={{ minWidth: 36, height: 36, color: '#fff', fontSize: '18px', p: 0 }}>›</Button>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AudioConverter;