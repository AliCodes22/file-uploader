import prisma from "../utils/prisma.js";
import path from "path";
import { promises as fs } from "fs";
import cloudinary from "../utils/cloudinary.js";

export const getFile = async (req, res, next) => {
  const { fileId } = req.params;

  try {
    const file = await prisma.file.findFirst({
      where: {
        id: Number(fileId),
      },
    });

    if (!file) {
      const error = new Error("File not found");
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json(file);
  } catch (error) {
    return next(error);
  }
};

export const downloadFile = async (req, res, next) => {
  const { fileId } = req.params;

  try {
    const file = await prisma.file.findFirst({
      where: {
        id: Number(fileId),
      },
    });

    if (!file) {
      const error = new Error("File not found");
      error.statusCode = 404;
      return next(error);
    }

    if (!file.path) {
      const error = new Error("Path not found");
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({
      url: file.path,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteFile = async (req, res, next) => {
  const { fileId } = req.params;

  try {
    const file = await prisma.file.findFirst({
      where: {
        id: Number(fileId),
      },
    });

    if (!file) {
      const error = new Error("File not found");
      error.statusCode = 404;
      return next(error);
    }

    await prisma.file.delete({
      where: {
        id: Number(fileId),
      },
    });

    await cloudinary.uploader.destroy(file.fileName);

    return res.status(200).json({
      message: "File deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
