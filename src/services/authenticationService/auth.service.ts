require("dotenv").config();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../database/model/user.model";
import { LoginResponse, IResponse } from "../../utils/interfaces";

declare const process: {
  env: {
    JWT_SECRET: string;
  };
};
export default class authService {
  constructor() {}

  public async login(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    return await this.loginAuth(username, password);
  }

  public async signup(username: string, password: string): Promise<IResponse> {
    return await this.signupAuth(username, password);
  }

  private async loginAuth(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    try {
      if (!username.trim() || !password.trim()) {
        const message = "Please fill in the empty fields!";
        const status = 404;
        return { message, status };
      }
      const user = await User.findOne({ username });
      if (!user) {
        const message = "No users associated with this username";
        const status = 500;
        return { message, status };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        const message = "Invalid password!";
        const status = 500;
        return { message, status };
      }

      const message = "Successfully Authenticated!";
      const accessToken = this.generateAccessToken(username);
      const status = 200;
      return { accessToken, message, status };
    } catch (err) {
      return { status: 404, message: "error" };
    }
  }

  private generateAccessToken(username: string): string {
    return jwt.sign(username, process.env.JWT_SECRET);
  }

  private async signupAuth(
    username: string,
    password: string
  ): Promise<IResponse> {
    try {
      if (!username.trim() || !password.trim()) {
        const message = "Please fill in the empty fields!";
        const status = 404;
        return { message, status };
      }
      const isUserFound = await User.exists({ username });
      if (isUserFound) {
        const message =
          "This username is already taken, please choose another one!";
        const status = 500;
        return { message, status };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      const status = 200;
      const message = "User created successfully";
      return { status, message };
    } catch (err) {
      return { status: 404, message: "Errored out" };
    }
  }
}
