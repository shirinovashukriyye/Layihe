import express from "express";
import verifyToken from "../middleware/protected/verifyToken.js";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProductById,
  searchProduct,
  updateProduct
} from "../controllers/productController.js";
import upload from "../upload/upload.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/search/:title", searchProduct);
productRouter.get("/:id", getProductById);

productRouter.post("/", verifyToken, upload.single("image"), addProduct);
productRouter.delete("/:id", verifyToken, deleteProduct);

productRouter.put("/:id", verifyToken, upload.single("image"), updateProduct);


export default productRouter;
