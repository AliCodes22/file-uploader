import express from "express";
import cors from "cors";
import prisma from "./utils/prisma.js";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";
import folderRouter from "./routes/folderRouter.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/folders", folderRouter);

dotenv.config();

app.get("/", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: 1,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("app is on");
});
