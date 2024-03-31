import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import myUserRoute from "./routes/MyUserRoutes";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("connected to database");
});

const app = express();
app.use(express.json());
app.use(cors());

// HEALTH ENDPOINT
app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "Server is running" });
});

app.use("/api/my/user", myUserRoute);

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
