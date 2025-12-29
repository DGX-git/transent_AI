var express = require('express');
var router = express.Router();
const uploadedFiles = require('../controller/uploadFilesController');
/* GET users listing. */
router.get('/getFiles', uploadedFiles.getFiles);
router.get('/getStatus', uploadedFiles.getStatus);

module.exports = router;
