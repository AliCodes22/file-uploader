import { Router } from "express";
import validateUser from "../middleware/authMiddleware.js";
import {
  addFolder,
  getAllFolders,
  addFile,
  getAllFiles,
  deleteFolder,
} from "../controllers/folderControllers.js";
import { upload } from "../multer.js";

const folderRouter = Router();

folderRouter.use(validateUser);

folderRouter.post("/", addFolder);
folderRouter.get("/", getAllFolders);
folderRouter.get("/:folderId", getAllFiles);
folderRouter.post("/:folderId/files", upload.single("file"), addFile);
folderRouter.delete("/:folderId", deleteFolder);

export default folderRouter;
