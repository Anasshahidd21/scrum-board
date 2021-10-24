import mongoose from "mongoose";
import { model, Schema, Model, Document } from "mongoose";
import { ITask, TaskState } from "../../utils/interfaces";

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  state: {
    type: TaskState,
    required: true,
  },
  creater: {
    type: String,
    required: true,
  },
});

const Task = model<ITask>("Task", TaskSchema);
export default Task;
