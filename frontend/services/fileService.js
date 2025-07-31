import axios from "axios";
import { handleAxiosError } from "./handleAxiosError";

export const downloadFile = async (token, fileId) => {
  try {
    const res = await axios.get(`/api/files/${fileId}/download`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getDownloadUrl = (filePath, fileName) => {
  // Example filePath:
  // https://res.cloudinary.com/dyvl7nycf/raw/upload/v1753523753/file-uploader-app/xqa4qnyycxd7w6oomyuk

  // Insert "fl_attachment:filename/" right after "upload/"
  const parts = filePath.split("/upload/");
  const downloadUrl = `${parts[0]}/upload/fl_attachment:${fileName}/${parts[1]}`;
  return downloadUrl;
};

export const deleteFile = async (token, fileId) => {
  try {
    const res = await axios.delete(`/api/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  } catch (error) {
    return handleAxiosError(error);
  }
};
