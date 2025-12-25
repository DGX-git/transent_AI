import { Box, Typography, Button, Container } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import Header from './Header';

const AudioConverter = () => {
  return (
    <Box className="audio-converter-wrapper">
      {/* Main Content */}
      <Container maxWidth="lg">
        <Box className="main-content">
          {/* Title */}
          <Typography variant="h3" className="main-title">
            Audio to Text Converter
          </Typography>

          {/* Subtitle */}
          <Typography variant="h6" className="subtitle">
            audio to intelligence: transcripts, entities, and sentiment in one
            place.
          </Typography>

          {/* Upload Button */}
          <Box className="upload-container">
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon className="upload-icon" />}
              className="upload-button"
            >
              Upload Files
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AudioConverter;
