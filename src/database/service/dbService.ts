require("dotenv").config();

import { MongoClient } from "mongodb";
import mongoose, { Connection } from "mongoose";

declare const process: {
  env: {
    MONGODB_CONNECTION_URL: string;
  };
};

let db: typeof mongoose | undefined;

/**
 * Connects to MongoDb.
 */
export const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(
      process.env.MONGODB_CONNECTION_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    if (dbConnection) {
      db = dbConnection;
      console.log("Connected to Database!");
    }
  } catch (e) {
    console.error(e);
  }
};

export const disconnectDB = async () => {
  try {
    if (db) {
      await db.disconnect();
    }
  } catch (err) {
    console.error(err);
  }
};
