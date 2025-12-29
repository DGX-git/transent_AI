
const sequelize = require('../config/sequelize.config');
const AUDIO_FILE = require('../model/audio-file.model');
const STATUS = require('../model/status.model');


const getFiles = async (req, res) => {
    try {
        await sequelize.sync();
        let audioFiles = await AUDIO_FILE.findAll();
        res.status(200).json(audioFiles);
    } catch (error) {
        console.log('Failed to fetch files', error);
        res.status(500).json({ error: 'Failed to fetch files' });
    }
};

const getStatus = async (req, res) => {
    try {
        await sequelize.sync();
        let statuses = await STATUS.findAll();
        res.status(200).json(statuses);
    } catch (error) {
        console.log('Failed to fetch status', error);
        res.status(500).json({ error: 'Failed to fetch status' });
    }
};




module.exports = { getFiles, getStatus };