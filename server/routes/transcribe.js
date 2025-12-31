const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');
const TRANSCRIPTION = require("../model/transcription.model");

const router = express.Router(); // Changed from express() to express.Router()

// Enable CORS for your backend
router.use(cors());

// const upload = multer({ storage: multer.memoryStorage() });

// // Proxy endpoint with database storage
// router.post('/transcription', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     console.log('Received file:', req.file.originalname, req.file.size, 'bytes');

//     // Get file_id and user_id from request body or session
//     const { file_id, user_id } = req.body; // You need to send these from frontend

//     // if (!file_id) {
//     //   return res.status(400).json({ error: 'file_id is required' });
//     // }

//     const formData = new FormData();
//     formData.append('file', req.file.buffer, {
//       filename: req.file.originalname,
//       contentType: req.file.mimetype,
//     });

//     console.log('Forwarding to transcription API...');

//     const response = await axios.post(
//       'https://8fcc3d002dae.ngrok-free.app/transcribe',
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//         },
//         maxContentLength: Infinity,
//         maxBodyLength: Infinity,
//         timeout: 120000,
//       }
//     );

//     console.log('Transcription successful');

//     // Save to database
//     // const transcriptionRecord = await TRANSCRIPTION.create({
//     //   file_id: 1,
//     //   transcripted_text: response.data.clean_transcript || response.data.transcript,
//     //   created_timestamp: new Date(),
//     //   updated_timestamp: new Date(),
//     //   created_by: user_id || null,
//     //   updated_by: user_id || null,
//     // });

//     console.log('Transcription saved to database with ID:', transcriptionRecord.transcription_id);

//     // Return both API response and database record
//     res.json({
//       success: true,
//       transcription_id: transcriptionRecord.transcription_id,
//       data: response.data,
//     });

//   } catch (error) {
//     console.error('Transcription error:', error.response?.data || error.message);
//     res.status(error.response?.status || 500).json({ 
//       error: 'Transcription failed',
//       details: error.response?.data || error.message 
//     });
//   }
// });

// Your other routes...

const upload = multer({ storage: multer.memoryStorage() });

router.post('/transcription', upload.single('file'), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post(
      'https://8fcc3d002dae.ngrok-free.app/transcribe',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

module.exports = router;