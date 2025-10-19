import Product from "../models/productModel.js";
import fs from "fs";
import path from "path";


export const addProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "Bütün sahələri doldurun." });
    }

    const image = req.file?.filename;

    const newProduct = new Product({
      title,
      description,
      price,
      image,
    });

    await newProduct.save();

    res.status(201).json({ message: "Məhsul əlavə olundu", product: newProduct });
  } catch (error) {
     console.error(error); 
  res.status(500).json({ message: error.message || "Server xətası" });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error("getProducts error:", err);
    res.status(500).json({ message: "Server xətası" });
  }
};


export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("getProductById error:", err);
    res.status(500).json({ message: "Server xətası" });
  }
};


export const searchProduct = async (req, res) => {
  try {
    const title = req.params.title;
    const products = await Product.find({
      title: { $regex: title, $options: "i" }, 
    });

    res.status(200).json(products);
  } catch (err) {
    console.error("searchProduct error:", err);
    res.status(500).json({ message: "Server xətası" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }

    if (product.image) {
      const imagePath = path.join("uploads", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Məhsul silindi" });
  } catch (err) {
    console.error("deleteProduct error:", err);
    res.status(500).json({ message: "Server xətası" });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};
    ["title","description","price"].forEach(k => { if(req.body[k]) updates[k] = req.body[k]; });
    if (req.file) updates.image = req.file.filename;
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ message: "Məhsul tapılmadı" });
    res.json(product);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

