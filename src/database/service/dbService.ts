require("dotenv").config();

import { MongoClient } from "mongodb";
import mongoose, { Connection } from "mongoose";

declare const process: {
  env: {
    MONGODB_CONNECTION_URL: string;
  };
};

/**
 * Connects to MongoDb.
 */
export async function connectDB() {
  try {
    const dbConnection = await mongoose.connect(
      process.env.MONGODB_CONNECTION_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    if (dbConnection) {
      console.log("Connected to Database!");
    }
  } catch (e) {
    console.error(e);
  }
}
