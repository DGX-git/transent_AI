const sequelize = require("../config/sequelize.config");
const USER = require("../model/users.model");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    console.log("📝 Registration request received");
    console.log("Request body:", req.body);

    const {
      first_name,
      last_name,
      email_id,
      password,
      contact_no
    } = req.body;

    // 🔹 Basic validation
    if (!email_id || !password) {
      console.warn("❌ Validation failed: Missing required fields");
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    console.log("✅ Validation passed");

    // 🔹 Sync database (ensures table exists)
    try {
      await sequelize.sync({ alter: false });
      console.log("✅ Database synced");
    } catch (syncError) {
      console.error("❌ Database sync error:", syncError.message);
      return res.status(503).json({
        message: "Database connection failed",
        error: syncError.message
      });
    }

    // 🔹 Check if user already exists
    console.log("🔍 Checking if user exists with email:", email_id);
    const existingUser = await USER.findOne({
      where: { email_id },
    });

    if (existingUser) {
      console.warn("❌ User already exists");
      return res.status(409).json({
        message: "User already exists",
      });
    }

    console.log("✅ User does not exist, proceeding...");

    // 🔹 Hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create user
    console.log("💾 Creating new user...");
    const newUser = await USER.create({
      first_name,
      last_name,
      email_id,
      password: hashedPassword,
      contact_no
    });

    console.log("✅ User created successfully:", newUser.user_id);

    return res.status(201).json({
      message: "Registration successful",
      user_id: newUser.user_id,
    });
  } catch (error) {
    console.error("❌ Create user error:", error.message);
    console.error("Full error stack:", error);
    
    // Check if it's a database connection error
    if (error.name === 'SequelizeConnectionError') {
      return res.status(503).json({
        message: "Database connection failed. Please try again later.",
        error: error.message
      });
    }

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: "Validation error",
        error: error.errors.map(e => e.message)
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}

module.exports = { createUser };