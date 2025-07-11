import { Router } from "express";
import validateUser from "../middleware/authMiddleware.js";
import { addFolder, getAllFolders } from "../controllers/folderControllers.js";

const folderRouter = Router();

folderRouter.use(validateUser);

folderRouter.post("/add", addFolder);
folderRouter.get("/", getAllFolders);

export default folderRouter;
