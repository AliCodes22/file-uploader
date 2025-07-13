import { Router } from "express";
import { downloadFile, getFile } from "../controllers/fileControllers.js";

const fileRouter = Router();

fileRouter.get("/:fileId", getFile);
fileRouter.get("/:fileId/download", downloadFile);

export default fileRouter;
