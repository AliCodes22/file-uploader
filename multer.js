import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const resourceType = file.mimetype === "application/pdf" ? "raw" : "auto";

    return {
      folder: "file-uploader-app",
      resource_type: resourceType, // Automatically detect type (image, raw, video)
    };
  },
});
export const upload = multer({
  storage,
});
