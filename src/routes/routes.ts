import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const auth = new authController();
// const auth = new authController();

const defaultRouter = Router();
const authRouter = Router();
const userRouter = Router();

authRouter.post("/login", auth.login);
authRouter.post("/signup", auth.signup);

defaultRouter.use("/auth", authRouter);
defaultRouter.use("/users", userRouter);

export default defaultRouter;
