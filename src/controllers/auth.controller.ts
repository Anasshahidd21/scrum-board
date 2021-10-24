import authService from "../services/authenticationService/authService";
import { LoginResponse, SignupResponse } from "../utils/interfaces";
import { Request, Response } from "express";

export class authController {
  service: authService;
  constructor() {
    this.service = new authService();
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const response: LoginResponse = await this.service.login(
      username,
      password
    );
    const { message, status, accessToken } = response;
    res.status(status).json({ message, accessToken });
    return;
  };

  public signup = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const response: SignupResponse = await this.service.signup(
      username,
      password
    );
    const { message, status } = response;
    res.status(status).json({ message });
    return;
  };
}
