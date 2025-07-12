import { Router } from "express";
import { createUser, loginUser } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/sign-up", createUser);
userRouter.post("/login", loginUser);

export default userRouter;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc1MjIyNTU0N30.2DE-p9PiadzaXIMjBIxNNRyC4-jGD2yVe_-ijD9BibU
