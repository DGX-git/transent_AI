const sequelize = require("../config/sequelize.config");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { Op } = require('sequelize');
const USER = require("../model/users.model");
const USER_OTP = require("../model/otp.model");

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate a random 6-digit OTP
 */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP via email using Zoho SMTP
 */
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `${otp} - OTP for Login Request`,
    text: `Dear User,

Your one-time password (OTP) for the login request is: ${otp}

This code is valid for 10 minutes.

If you did not request this code, please ignore this email.

Regards,
Administration Team`,
  };

  // Send the email
  return transporter.sendMail(mailOptions);
};

/**
 * Delete OTP after it expires (10 minutes)
 */
async function deleteOtp(otpId) {
  try {
    await USER_OTP.destroy({
      where: { otp_id: otpId },
    });
    console.log(`🧹 Deleted expired OTP with ID: ${otpId}`);
  } catch (error) {
    console.error("❌ Error deleting OTP:", error);
  }
}

// ============================================
// API ENDPOINTS
// ============================================

/**
 * ENDPOINT 1: Send OTP
 * POST /login/send-otp
 * Body: { email: "user@example.com" }
 */
const sendOtp = (async (req, res) => {
  try {
    const { email } = req.body;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    console.log(`\n📧 Login request for: ${email}`);

    // Step 1: Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Step 2: Check if user exists
    console.log("🔍 Checking if user exists...");
    const user = await USER.findOne({ where: { email_id: email } });

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
        userExists: false,
      });
    }

    console.log(`✅ User found: ${user.first_name} ${user.last_name}`);

    // Step 3: Generate OTP
    const otp = generateOtp();
    console.log(`🔐 Generated OTP: ${otp}`);

    // Step 4: Send OTP via email
    try {
      await sendOtpEmail(email, otp);
      console.log("✅ OTP email sent successfully");
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError.message);
      
      // Log OTP to console for development
      console.log("\n" + "=".repeat(50));
      console.log("📧 DEVELOPMENT MODE - OTP in Console");
      console.log("=".repeat(50));
      console.log(`Email: ${email}`);
      console.log(`OTP Code: ${otp}`);
      console.log(`Valid for: 10 minutes`);
      console.log("=".repeat(50) + "\n");
    }

    // Step 5: Store OTP in database
    const otpRecord = await USER_OTP.create({
      otp,
      user_id: user.user_id,
      created_timestamp: new Date(),
      created_by: user.user_id,
    });

    console.log(`💾 OTP saved to database with ID: ${otpRecord.otp_id}`);

    // Step 6: Set auto-delete timer (10 minutes = 600000 ms)
    setTimeout(() => {
      deleteOtp(otpRecord.otp_id);
    }, 600000);

    // Step 7: Create temporary JWT token (1 minute for demo)
    const tempToken = jwt.sign(
      { email, user_id: user.user_id },
      jwtSecretKey,
      { expiresIn: "1m" } // 🔴 DEMO: 1 minute
    );

    // Step 8: Send success response
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email",
      temp_token: tempToken,
      userExists: true,
      // Show OTP in development mode
      dev_otp: process.env.NODE_ENV === "development" ? otp : undefined,
    });

  } catch (error) {
    console.error("❌ Error in send-otp:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again later.",
      error: error.message,
    });
  }
});

/**
 * ENDPOINT 2: Verify OTP
 * POST /login/verify-otp
 * Body: { email: "user@example.com", otp: "123456" }
 */
const verifyOtp = (async (req, res) => {
  try {
    const { email, otp } = req.body;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    console.log(`\n🔍 Verifying OTP for: ${email}`);

    // Step 1: Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Step 2: Check if user exists
    const user = await USER.findOne({ where: { email_id: email } });

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({
        success: false,
        message: "User not found with the provided email.",
      });
    }

    // Step 3: Verify OTP from database (with 5-minute validity check)
    const otpRecord = await USER_OTP.findOne({
      where: {
        user_id: user.user_id,
        otp: otp,
        created_timestamp: {
          [Op.gte]: new Date(Date.now() - 5 * 60 * 1000), // OTP valid for last 5 minutes
        },
      },
    });

    if (!otpRecord) {
      console.log("❌ Invalid or expired OTP");
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. Please request a new one.",
      });
    }

    console.log("✅ OTP verified successfully");

    // Step 4: Mark OTP as verified (optional)
    await otpRecord.update({
      updated_timestamp: new Date(),
      updated_by: 'System',
      verified: true,
    });

       // Step 5: Generate JWT tokens (20 minutes session like JHS)
    const token = jwt.sign(
      {
        email,
        user_id: user.user_id,
        userName: `${user.first_name} ${user.last_name}`,
      },
      jwtSecretKey,
      { expiresIn: "20m" }
    );

    const accessToken = jwt.sign(
      { email: email, user_id: user.user_id },
      process.env.ACCESS_TOKEN_SECRET || jwtSecretKey,
      { expiresIn: "20m" }
    );

    const refreshToken = jwt.sign(
      { user_id: user.user_id },
      process.env.REFRESH_TOKEN_SECRET || jwtSecretKey,
      { expiresIn: "20m" }
    );

    // Step 6: Set cookies (with JHS configuration)
    res.cookie("access-token", accessToken, {
      httpOnly: true,
      sameSite: "Strict",
      secure: true, // Always true like JHS
      maxAge: 10 * 60 * 1000, // 10 minutes
    });

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      secure: true, // Always true like JHS
      maxAge: 20 * 60 * 1000, // 20 minutes
    });

    // Step 7: Delete OTP after successful verification
    await USER_OTP.destroy({
      where: { otp_id: otpRecord.otp_id },
    });

    console.log("🧹 OTP deleted after successful verification");
    console.log("⏱️  DEMO MODE: Session will expire in 1 minute");

    // Step 8: Send success response
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully! Login complete. [DEMO: Session expires in 1 minute]",
      jwt_token: token,
      token: token,
      user: {
        id: user.user_id,
        email: user.email_id,
        first_name: user.first_name,
        last_name: user.last_name,
        contact_no: user.contact_no,
      },
    });

  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP. Please try again later.",
      error: error.message,
    });
  }
});

/**
 * ENDPOINT 4: Check Session Status
 * GET /login/check-session
 * Checks if the current session is valid
 */
const checkSession = (async (req, res) => {
  try {
    const accessToken = req.cookies['access-token'];
    
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: 'No active session found',
        sessionExpired: true
      });
    }

    // Verify token
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET_KEY
    );

    console.log("✅ Session is active for user:", decoded.email);

    return res.status(200).json({
      success: true,
      message: 'Session is active',
      sessionExpired: false,
      user: {
        user_id: decoded.user_id,
        email: decoded.email
      }
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log("❌ Session expired");
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please login again.',
        sessionExpired: true
      });
    }

    if (error.name === 'JsonWebTokenError') {
      console.log("❌ Invalid token");
      return res.status(401).json({
        success: false,
        message: 'Invalid session. Please login again.',
        sessionExpired: true
      });
    }

    console.error("❌ Session check error:", error);
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      sessionExpired: true
    });
  }
});

/**
 * ENDPOINT 5: Sign Out
 * POST /login/signout
 */
const signOut = (async (req, res) => {
  const accessToken = jwt.sign(
    { email: "", user_id: "" },
    process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET_KEY,
    { expiresIn: "0s" }
  );

  res.cookie("access-token", accessToken, {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    maxAge: 0,
  });

  const refreshToken = jwt.sign(
    { user_id: "" },
    process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET_KEY,
    { expiresIn: "0s" }
  );

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    maxAge: 0,
  });

  res.status(200).json({ 
    success: true,
    message: "Logged out successfully." 
  });
});
module.exports = { sendOtp, verifyOtp, checkSession, signOut  };

