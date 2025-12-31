const express = require("express");
const router = express.Router();
const loginController = require("../controller/logincontroller");

router.post("/send-otp", loginController.sendOtp);

router.post("/verify-otp", loginController.verifyOtp);

router.post("/check-session", loginController.checkSession);

router.post("/sign-out", loginController.signOut);


module.exports = router;