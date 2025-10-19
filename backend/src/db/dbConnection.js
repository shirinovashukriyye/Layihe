import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI;
console.log("Mongo URI:", mongoUri);

mongoose
  .connect(mongoUri)  
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB");
    console.error(err.message);
  });
