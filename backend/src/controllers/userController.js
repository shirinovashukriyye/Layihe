import user from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken.js";
import { recieveMail } from "../middleware/mailer/mailer.js";
import jwt from "jsonwebtoken";
import RegisterValidationSchema from "../middleware/validation/RegisterValidation.js";
import LoginValidationSchema from "../middleware/validation/LoginValidation.js";
import ForgotValidationSchema from "../middleware/validation/ForgotValidation.js";
import ResetValidationSchema from "../middleware/validation/ResetValidation.js";


export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Fayl yoxdursa, filename undefined olacaq
    const filename = req.file?.filename;

    // Şəkil URL-i: boş olsa da undefined kimi ötürülə bilər
    const imageUrl = filename ? `images/${filename}`.replace(/\\/g, "/") : "";

    // Joi validasiyasına image sahəsini də əlavə et
    const { error } = RegisterValidationSchema.validate({
      name,
      username,
      email,
      password,
      image: imageUrl,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Əgər eyni email ilə istifadəçi varsa
    const existUser = await user.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Şifrəni hash-lə
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni user yarat
    const newUser = new user({
      image: imageUrl,
      name,
      username,
      email,
      password: hashedPassword,
    });

    // DB-yə yaz
    await newUser.save();

    // Token yarat və cookie-yə yaz
    generateToken(newUser._id, res);

    // E-poçt təsdiqləmə linki
    const confirmLink = `${process.env.SERVER_LINK}/auth/verify`;

    // Təsdiq mailini göndər
    recieveMail(newUser, confirmLink);

    // Uğurlu cavab
    return res.status(201).json({
      message: "User created successfully",
      newUser,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.cookies.token;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const updatedVerify = await user.findByIdAndUpdate(
      { _id: decoded.id },
      { isVerified: true }
    );

    if (updatedVerify) {
      return res.redirect(`${process.env.CLIENT_LINK}/login`);
    }
  } catch (error) {
    return res.status(400).json({ message: "Token not valid or expaired in" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { error } = LoginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ username: username });

    if (!existUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Username or Password wrong" });
    }

    generateToken(existUser._id, res);

    return res.status(200).json({
      message: "User logged in successfully",
      existUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = ForgotValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ email });

    if (!existUser) return res.status(404).json({ message: "User not found" });

    generateToken(existUser._id, res, "resetToken");

    const resetLink = `${process.env.CLIENT_LINK}/resetpassword`;

    recieveMail(existUser, resetLink);

    return res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  console.log();
  console.log(req.body);

  try {
    const { password } = req.body;

    const { error } = ResetValidationSchema.validate({
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const resetToken = req.cookies.resetToken;

    if (!resetToken) {
      return res
        .status(400)
        .json({ message: "No token found, request new one" });
    }

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

    const existUser = await user.findById(decoded.id);

    if (!existUser) {
      return res.status(400).json({ message: "Token not valid or expaired" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    existUser.password = hashedPassword;

    await existUser.save();

    res.clearCookie("resetToken");

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
