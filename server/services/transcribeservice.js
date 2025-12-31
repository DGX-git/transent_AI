const sequelize = require("../config/sequelize.config");
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const TRANSCRIPTION = require("../model/transcription.model");


const transcribeAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log(
      'Received file:',
      req.file.originalname,
      req.file.size,
      'bytes'
    );

    const { file_id, user_id } = req.body;

    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    console.log('Forwarding to transcription API...');

    const response = await axios.post(
      'https://8fcc3d002dae.ngrok-free.app/transcribe',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 120000,
      }
    );

    console.log('Transcription successful');

    const transcriptionRecord = await TRANSCRIPTION.create({
      file_id: file_id || 1, // fallback if not sent
      transcripted_text:
        response.data.clean_transcript || response.data.transcript,
      created_timestamp: new Date(),
      updated_timestamp: new Date(),
      created_by: user_id || null,
      updated_by: user_id || null,
    });

    console.log(
      'Transcription saved with ID:',
      transcriptionRecord.transcription_id
    );

    return res.status(200).json({
      success: true,
      transcription_id: transcriptionRecord.transcription_id,
      data: response.data,
    });

  } catch (error) {
    console.error(
      'Transcription error:',
      error.response?.data || error.message
    );

    return res.status(error.response?.status || 500).json({
      success: false,
      error: 'Transcription failed',
      details: error.response?.data || error.message,
    });
  }
};

module.exports = {
  transcribeAudio,
};