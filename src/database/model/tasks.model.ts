import { Document } from "mongoose";

export enum TaskState {
  COMPLETE,
  PROGRESS,
  INCOMPLETE,
}

export interface ImageScheme extends Document {
  name: string;
  description: string;
  state: TaskState;
}
