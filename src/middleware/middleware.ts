require("dotenv").config();

import express from "express";
const app = express();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to authenticate the users before performing any task.
 * @returns the logged in user as the body of the request | an error.
 */
export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.body.user = user;
    next();
  });
}
