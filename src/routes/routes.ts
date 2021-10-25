import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { taskController } from "../controllers/task.controller";
import authenticateToken from "../middleware/middleware";

const auth = new authController();
const tasks = new taskController();

const defaultRouter = Router();
const authRouter = Router();
const taskRouter = Router();

authRouter.post("/login", auth.login);
authRouter.post("/signup", auth.signup);

taskRouter.post("/newTask", authenticateToken, tasks.addNewTask);
taskRouter.put("/updateTask/:id", authenticateToken, tasks.updateStatus);
taskRouter.delete("/deleteTask/:id", authenticateToken, tasks.deleteTask);
taskRouter.get("/state", authenticateToken, tasks.getTasksByState);
taskRouter.get("/:id", authenticateToken, tasks.getTaskByID);

defaultRouter.use("/auth", authRouter);
defaultRouter.use("/tasks", taskRouter);

export default defaultRouter;
