import { Router } from "express";
import {
  downloadFile,
  getFile,
  deleteFile,
} from "../controllers/fileControllers.js";
import validateUser from "../middleware/authMiddleware.js";

const fileRouter = Router();

fileRouter.use(validateUser);

fileRouter.get("/:fileId", getFile);
fileRouter.get("/:fileId/download", downloadFile);
fileRouter.delete("/:fileId", deleteFile);

export default fileRouter;
