import authService from "../services/authenticationService/authService";
import { LoginResponse } from "../utils/interfaces";
import { Request, Response } from "express";

export class authController {
  service: authService;
  constructor() {
    this.service = new authService();
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (!username.trim() || !password.trim()) {
      res.status(404).json({ message: "Please fill in the empty fields!" });
    }

    const response: LoginResponse = await this.service.login(
      username,
      password
    );
    const { message, status, accessToken } = response;
    res.status(status).json({ message, accessToken });
  };
}
