import { Router } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
} from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/sign-up", createUser);
userRouter.post("/login", loginUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
