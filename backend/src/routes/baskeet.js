// import express from "express";
// import verifyToken from "../middleware/verifyToken.js";
// import Basket from "../models/Basket.js";

// const basketRouter = express.Router();

// // Add to basket
// basketRouter.post("/add/:id", verifyToken, async (req, res) => {
//   const existing = await Basket.findOne({
//     userId: req.userId,
//     productId: req.params.id,
//   });

//   if (existing) {
//     existing.quantity += 1;
//     await existing.save();
//     return res.json({ message: "Miqdar artırıldı", item: existing });
//   }

//   const item = new Basket({
//     userId: req.userId,
//     productId: req.params.id,
//     quantity: 1,
//   });

//   await item.save();
//   res.status(201).json({ message: "Səbətə əlavə olundu", item });
// });

// // Get user's basket
// basketRouter.get("/", verifyToken, async (req, res) => {
//   const basket = await Basket.find({ userId: req.userId }).populate("productId");
//   res.json(basket);
// });

// // Remove item
// basketRouter.delete("/:id", verifyToken, async (req, res) => {
//   await Basket.findOneAndDelete({
//     userId: req.userId,
//     productId: req.params.id,
//   });
//   res.json({ message: "Səbətdən silindi" });
// });

// export default basketRouter;
