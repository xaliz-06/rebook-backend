import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

import myUserRoute from "./routes/MyUserRoutes";
import myStoreRoute from "./routes/MyStoreRoute";
import storeRoute from "./routes/StoreRoutes";
import orderRoute from "./routes/OrderRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("connected to database");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());
// HEALTH ENDPOINT
app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "Server is running" });
});

app.use("/api/my/store", myStoreRoute);
app.use("/api/my/user", myUserRoute);
app.use("/api/store", storeRoute);
app.use("/api/order", orderRoute);

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
