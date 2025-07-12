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

export const addFile = async (req, res) => {
  const { folderId } = req.params;
  const file = req.file;

  const { originalname, mimetype, size } = file;

  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id: Number(folderId),
      },
      include: { files: true },
    });

    if (!folder) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }

    const newFile = await prisma.file.create({
      data: {
        originalName: originalname,
        mimetype,
        size,
        folderId: Number(folderId),
        userId: req.user.id,
      },
    });

    const { files } = folder;

    return res.status(201).json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
