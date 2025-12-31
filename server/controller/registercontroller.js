const registerservice = require("../services/registerservice");

const createUser = async (request, response) => {
  registerservice.createUser(request, response);
};

module.exports = {
  createUser,
};