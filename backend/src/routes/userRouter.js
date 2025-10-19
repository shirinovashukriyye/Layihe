import express from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
   addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
} from "../controllers/userController.js";
// import upload from "../upload/upload.js";
import  verifyToken from "../middleware/protected/verifyToken.js";

import  verifyAdmin  from "./auth.js";
import { getUsers, toggleBlockUser, getUserLists } from "../controllers/adminController.js";



const userRouter = express.Router();

// userRouter.post("/register", upload.single("image"), register);
userRouter.post("/register", register);
userRouter.get("/verify", verifyEmail);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.post("/resetpassword", resetPassword);

userRouter.post("/wishlist/:productId", verifyToken, addToWishlist);
userRouter.delete("/wishlist/:productId", verifyToken, removeFromWishlist);

userRouter.post("/cart/:productId", verifyToken, addToCart);
userRouter.delete("/cart/:productId", verifyToken, removeFromCart);

userRouter.get("/", verifyToken, verifyAdmin, getUsers);
userRouter.put("/:id/block", verifyToken, verifyAdmin, toggleBlockUser);
userRouter.get("/:id/lists", verifyToken, verifyAdmin, getUserLists);


export default userRouter;
