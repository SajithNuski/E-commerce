import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import { productRouter } from "./routes/productRoute.js";
import cartRouter from "./routes/cartRote.js";

//App config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  }),
);

//API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Zoro API!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
