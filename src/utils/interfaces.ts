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

export interface IResponse {
  message: string;
  status: number;
}

export declare const process: {
  env: {
    MONGODB_CONNECTION_URL: string;
    JWT_SECRET: string;
    PORT: number;
  };
};

export enum TaskState {
  COMPLETE,
  PROGRESS,
  INCOMPLETE,
}

export interface ITask extends Document {
  title: string;
  description: string;
  creater: string;
  state: TaskState;
}

export interface ITaskResponse {
  status: number;
  message?: string;
  task?: ITask[];
}
