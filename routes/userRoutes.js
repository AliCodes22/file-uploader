import { Router } from "express";
import { createUser, loginUser } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/sign-up", createUser);
userRouter.post("/login", loginUser);

export default userRouter;
