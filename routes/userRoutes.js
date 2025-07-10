import { Router } from "express";
import { createUser } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/", createUser);

export default userRouter;
