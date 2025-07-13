import prisma from "../utils/prisma.js";
import path from "path";
import { fileURLToPath } from "url";

export const getFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await prisma.file.findFirst({
      where: {
        id: Number(fileId),
      },
    });

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    return res.status(200).json(file);
  } catch (error) {
    console.log(error);
  }
};

export const downloadFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await prisma.file.findFirst({
      where: {
        id: Number(fileId),
      },
    });

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    const filePath = path.resolve(process.cwd(), "uploads", file.storedName);

    res.download(filePath);
  } catch (error) {
    console.log(error);
  }
};
