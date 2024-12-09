const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/sendEmail");
const verifyEmailTemplate = require("../utils/VerifyEmailTemplates");

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
        success: false,
        error: true,
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
        error: true,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(payload);
    const save = await newUser.save();

    const sendEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from Blinkit",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailTemplate,
      }),
    });

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEamil = await sendEmail({
      sendTo: email,
      subject: "Verify email from binkeyit",
      html: verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      }),
    });

    return response.json({
      message: "User registered successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    return response.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

export async function loginUser(req, res) {}
