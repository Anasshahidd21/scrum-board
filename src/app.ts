import express from "express";
const app = express();
import mongoose from "mongoose";
import { connectDB } from "./database/service/dbService";
import defaultRouter from "./routes/routes";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", defaultRouter);

export default app;
