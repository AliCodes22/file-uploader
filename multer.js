import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "file-uploader-app",
    allowed_formats: ["jpg", "png", "pdf", "docx", "txt"],
    transformations: [
      {
        quality: "auto",
      },
    ],
  },
});

export const upload = multer({
  storage,
});
