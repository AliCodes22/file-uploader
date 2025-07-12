import { Router } from "express";
import validateUser from "../middleware/authMiddleware.js";
import {
  addFolder,
  getAllFolders,
  addFile,
} from "../controllers/folderControllers.js";
import { upload } from "../multer.js";

const folderRouter = Router();

folderRouter.use(validateUser);

folderRouter.post("/add", addFolder);
folderRouter.get("/", getAllFolders);
folderRouter.post("/:folderId/files", upload.single("file"), addFile);

export default folderRouter;
