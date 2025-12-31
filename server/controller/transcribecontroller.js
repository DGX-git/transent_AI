const transcribeService = require("../services/transcribeservice");

const transcribeAudio = async (request, response) => {
  transcribeService.transcribeAudio(request, response);
};

module.exports = {
  transcribeAudio,
};