require("dotenv").config();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../database/model/user.model";
import {
  IResponse,
  ITask,
  ITaskResponse,
  TaskState,
} from "../../utils/interfaces";
import Task from "../../database/model/tasks.model";

export default class taskService {
  public async getTask(id: string): Promise<ITaskResponse> {
    return await this.getTaskByID(id);
  }

  public async getCurrentStateTask(state: TaskState): Promise<ITaskResponse> {
    return await this.getTasksByStatus(state);
  }

  public async delete(id: string, user: string): Promise<IResponse> {
    return await this.deleteTask(id, user);
  }

  public async updateStatus(
    id: string,
    state: TaskState,
    user: string
  ): Promise<IResponse> {
    return await this.updateTaskStatus(id, state, user);
  }

  public async addTask(task: Partial<ITask>, user: string): Promise<IResponse> {
    return await this.addNewTask(task, user);
  }

  private async addNewTask(
    { title, description, state }: Partial<ITask>,
    user: string
  ) {
    try {
      const newTask = new Task({ title, description, state, creater: user });
      await newTask.save();
      const message = "Task successfully added";
      const status = 200;
      return { message, status };
    } catch (err) {
      const message = "Error occured while adding task";
      const status = 404;
      return { message, status };
    }
  }

  private async updateTaskStatus(id: string, state: TaskState, user: string) {
    try {
      const filter = { _id: id, creater: user };
      const update = { state };
      const task = await Task.findOneAndUpdate(filter, update);
      if (!task) {
        const message = "Task not found";
        const status = 500;
        return { message, status };
      }
      const message = "Task successfully added";
      const status = 200;
      return { message, status };
    } catch (err) {
      const message = "Error occured while adding task";
      const status = 404;
      return { message, status };
    }
  }

  private async deleteTask(id: string, user: string) {
    try {
      const filter = { _id: id, creater: user };
      const task = await Task.findOneAndDelete(filter);
      if (!task) {
        const message = "Task not found";
        const status = 500;
        return { message, status };
      }
      const message = "Task successfully deleted";
      const status = 200;
      return { message, status };
    } catch (err) {
      const message = "Error occured while adding task";
      const status = 404;
      return { message, status };
    }
  }

  private async getTaskByID(id: string) {
    try {
      const filter = { _id: id };
      const task = await Task.findOne(filter);
      if (!task) {
        const message = "Task not found";
        const status = 500;
        return { message, status };
      }
      const status = 200;
      return { task: [task], status };
    } catch (err) {
      const message = "Error occured while adding task";
      const status = 404;
      return { message, status };
    }
  }

  private async getTasksByStatus(state: TaskState): Promise<ITaskResponse> {
    try {
      const tasks = await Task.find({ state });
      if (!tasks) {
        const message = `No task in ${state}`;
        const status = 500;
        return { message, status };
      }
      const status = 200;
      return { task: tasks, status };
    } catch (err) {
      const message = "Error occured while adding task";
      const status = 404;
      return { message, status };
    }
  }
}
