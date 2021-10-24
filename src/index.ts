require("dotenv").config();

import express from "express";
const app = express();
import mongoose from "mongoose";
import { connectDB } from "./database/service/dbService";
import defaultRouter from "./routes/routes";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, async () => {
  console.log("Server Started");
  await connectDB();
});

app.use("/api/v1", defaultRouter);
