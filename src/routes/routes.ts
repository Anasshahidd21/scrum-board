import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { taskController } from "../controllers/task.controller";

const auth = new authController();
const tasks = new taskController();

const defaultRouter = Router();
const authRouter = Router();
const taskRouter = Router();

authRouter.post("/login", auth.login);
authRouter.post("/signup", auth.signup);

taskRouter.post("/newTask", tasks.addNewTask);
taskRouter.post("/updateTask/:id", tasks.updateStatus);
taskRouter.post("/deleteTask/:id", tasks.deleteTask);
taskRouter.get("/state", tasks.getTasksByState);
taskRouter.get("/:id", tasks.getTaskByID);

defaultRouter.use("/auth", authRouter);
defaultRouter.use("/tasks", taskRouter);

export default defaultRouter;
