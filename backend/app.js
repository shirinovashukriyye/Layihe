import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import cors from "cors";
import "./src/db/dbConnection.js";
import productRouter from "./src/routes/productRouter.js";
import userRouter from "./src/routes/userRouter.js";
import cookieParser from "cookie-parser";
import path from "path";




const port = process.env.PORT || 5001;
const app = express();


app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);
app.use(cookieParser());

app.use("/api/products", productRouter);
app.use("/auth", userRouter);
 app.use("/images", express.static("src/images"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});