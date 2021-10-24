import { LoginResponse, IResponse, ITaskResponse } from "../utils/interfaces";
import { Request, Response } from "express";
import taskService from "../services/taskService/task.service";

export class taskController {
  service: taskService;
  constructor() {
    this.service = new taskService();
  }

  public addNewTask = async (req: Request, res: Response): Promise<void> => {
    const { task, user } = req.body;
    const response: IResponse = await this.service.addTask(task, user);
    const { message, status } = response;
    res.status(status).json({ message });
  };

  public updateStatus = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { state, user } = req.body;
    const response: IResponse = await this.service.updateStatus(
      id,
      state,
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
    const response: ITaskResponse = await this.service.getCurrentStateTask(
      state
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
}
