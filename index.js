import express from "express";
import cors from "cors";
import prisma from "./utils/prisma.js";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";
import folderRouter from "./routes/folderRouter.js";
import fileRouter from "./routes/fileRouter.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/api/user", userRouter);
app.use("/api/folders", folderRouter);
app.use("/api/files", fileRouter);

dotenv.config();

app.listen(3000, () => {
  console.log("app is on");
});

app.use(errorMiddleware);
