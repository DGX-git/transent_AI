const loginService = require("../services/loginservice");

const sendOtp = async (request, response) => {
  loginService.sendOtp(request, response);
};

const verifyOtp = async (request, response) => {
  loginService.verifyOtp(request, response);
};

const checkSession = async (request, response) => {
  loginService.checkSession(request, response);
};

const signOut = async (request, response) => {
  loginService.signOut(request, response);
};

module.exports = {
    sendOtp,
    verifyOtp,
    checkSession,
    signOut
};