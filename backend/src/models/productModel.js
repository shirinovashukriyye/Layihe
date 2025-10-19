import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  //     slug: {
  //   type: String,
  //   required: true,
  //   unique: true
  // }
  },
  { collection: "Products", timestamps: true }
);

const product =
  mongoose.model("Product", productSchema);

export default product;
