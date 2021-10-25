import {
  LoginResponse,
  IResponse,
  ITaskResponse,
  TaskState,
} from "../utils/interfaces";
import { Request, Response } from "express";
import taskService from "../services/taskService/task.service";

export class taskController {
  service: taskService;
  constructor() {
    this.service = new taskService();
  }

  public addNewTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { task, user } = req.body;
      const state = this.taskStateChecker(task["state"]);
      if (state === undefined) {
        res.status(500).json({ message: "Please send in the task state" });
      }
      const response: IResponse = await this.service.addTask(
        { ...task, state },
        user
      );
      const { message, status } = response;
      res.status(status).json({ message });
    } catch (err) {
      res.status(500).json({ message: "failed" });
    }
  };

  public updateStatus = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { state, user } = req.body;
    const taskState = this.taskStateChecker(state);
    if (taskState === undefined) {
      res.status(500).json({ message: "Please send in the task state" });
      return;
    }
    const response: IResponse = await this.service.updateStatus(
      id,
      taskState,
      user
    );
    const { message, status } = response;
    res.status(status).json({ message });
  };

  public deleteTask = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { user } = req.body;
    const response: IResponse = await this.service.delete(id, user);
    const { message, status } = response;
    res.status(status).json({ message });
  };

  public getTasksByState = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { state } = req.body;
    const taskState = this.taskStateChecker(state);
    if (!taskState) {
      res.status(500).json({ message: "Please send in the task state" });
      return;
    }
    const response: ITaskResponse = await this.service.getCurrentStateTask(
      taskState
    );
    const { message, status, task } = response;
    res
      .status(status)
      .json({ message: message ? message : undefined, task: task ? task : [] });
  };

  public getTaskByID = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const response: ITaskResponse = await this.service.getTask(id);
    const { message, status, task } = response;
    res
      .status(status)
      .json({ message: message ? message : undefined, task: task ? task : [] });
  };

  private taskStateChecker(taskState: string) {
    if (taskState == "COMPLETE") return TaskState.COMPLETE;
    if (taskState == "PROGRESS") return TaskState.PROGRESS;
    if (taskState == "INCOMPLETE") return TaskState.INCOMPLETE;
    else return undefined;
  }
}
