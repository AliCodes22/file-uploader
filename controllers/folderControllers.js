import folderSchema from "../schemas/FolderSchema.js";
import prisma from "../utils/prisma.js";
import cloudinary from "../utils/cloudinary.js";
import FileSchema from "../schemas/FileSchema.js";

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

    const folders = await prisma.folder.findMany({
      where: {
        id: req.user.id,
      },
    });

    return res.status(201).json({
      message: "Folder created successfully",
      folders,
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

  const { originalname, mimetype, size, filename, path } = FileSchema.parse(
    req.file
  );

  const type = mimetype.split("/")[1];

  const extension = `.${type}`;

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
        path,
        fileName: filename,
        extension,
      },
    });

    return res.status(201).json({
      message: "File added",
      folder,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllFiles = async (req, res) => {
  const { folderId } = req.params;

  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id: Number(folderId),
      },
      include: {
        files: true,
      },
    });

    if (!folder) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }

    const { files } = folder;

    res.status(200).json(files);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteFolder = async (req, res) => {
  const { folderId } = req.params;

  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id: Number(folderId),
      },
      include: {
        files: true,
      },
    });

    if (!folder) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }

    const { files } = folder;
    console.log(folder);

    await Promise.all(
      files.map((file) => {
        return cloudinary.uploader.destroy(file.fileName);
      })
    );

    await prisma.folder.delete({
      where: {
        id: Number(folderId),
      },
    });

    return res.status(200).json({
      message: "Folder deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
