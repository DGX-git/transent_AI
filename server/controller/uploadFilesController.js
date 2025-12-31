const uploadFilesServices = require('../services/uploadFilesServices');

const getFiles = (request, response) => {
    uploadFilesServices.getFiles(request, response);
}

const getStatus = (request, response) => {
    uploadFilesServices.getStatus(request, response);
}

module.exports = {getFiles, getStatus};