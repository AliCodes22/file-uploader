import { Router } from "express";
import { getFile } from "../controllers/fileControllers.js";

const fileRouter = Router();

fileRouter.get("/:fileId", getFile);

export default fileRouter;
