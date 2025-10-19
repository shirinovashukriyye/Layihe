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


    const { error } = RegisterValidationSchema.validate({
      name,
      username,
      email,
      password,
     
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new user({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

 
    generateToken(newUser._id, res);

    const confirmLink = `${process.env.SERVER_LINK}/auth/verify`;


    recieveMail(newUser, confirmLink);


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


    const { error } = LoginValidationSchema.validate({ username, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ username });

    if (!existUser) {
      return res.status(400).json({ message: "İstifadəçi tapılmadı" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "İstifadəçi adı və ya şifrə yanlışdır" });
    }

    generateToken(existUser._id, res);


    return res.status(200).json({
      message: "Giriş uğurludur",
      user: {
        _id: existUser._id,
        name: existUser.name,
        username: existUser.username,
        email: existUser.email,
      },
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


export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id; 
    const productId = req.params.productId;

    const user = await User.findById(userId);

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    return res.status(200).json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const user = await User.findById(userId);

    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    return res.status(200).json({ message: "Product removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const quantity = req.body.quantity || 1;

    const user = await User.findById(userId);

    const cartItemIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();

    return res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const user = await User.findById(userId);

    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    await user.save();

    return res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

