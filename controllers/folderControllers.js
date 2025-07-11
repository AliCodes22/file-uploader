import folderSchema from "../schemas/FolderSchema.js";
import prisma from "../utils/prisma.js";

export const addFolder = async (req, res) => {
  try {
    const { name } = folderSchema.parse(req.body);
    const { id } = req.user;

    const newFolder = await prisma.folder.create({
      data: {
        name,
        userId: id,
      },
    });

    return res.status(201).json({
      message: "Folder created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid fields",
    });
  }
};

export const getAllFolders = async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
      },
    });

    if (folders.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(folders);
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};
