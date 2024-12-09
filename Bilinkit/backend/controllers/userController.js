import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import sendEmail from "../config/sendEmail.js";
// import verifyEmailTemplate from "../utils/VerifyEmailTemplates.js";

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
    // try {
    //   const emailSend = await sendEmail({
    //     sendTo: email,
    //     subject: "Verify email from Blinkit",
    //     html: verifyEmailTemplate({
    //       name,
    //       url: VerifyEmailUrl,
    //     }),
    //   });
    // } catch (err) {
    //   console.error("Error sending email:", err);
    //   return res.status(500).json({
    //     message: "Failed to send email",
    //     error: true,
    //     success: false,
    //   });
    // }
    // const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    // const verifyEamil = await sendEmail({
    //   sendTo: email,
    //   subject: "Verify email from binkeyit",
    //   html: verifyEmailTemplate({
    //     name,
    //     url: VerifyEmailUrl,
    //   }),
    // });

    return res.json({
      message: "User registered successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

export async function loginUser(req, res) {}
