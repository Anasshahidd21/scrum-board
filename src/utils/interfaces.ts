import { Document } from "mongoose";
export interface IUser extends Document {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  message: string;
  status: number;
}

export interface SignupResponse {
  message: string;
  status: number;
}
