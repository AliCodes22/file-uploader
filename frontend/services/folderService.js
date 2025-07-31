import axios from "axios";
import { handleAxiosError } from "./handleAxiosError";

export const getAllFolders = async (token) => {
  try {
    const res = await axios.get("/api/folders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createFolder = async (token, name) => {
  try {
    const res = await axios.post(
      "/api/folders",
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getFolderFiles = async (token, id) => {
  try {
    const res = await axios.get(`/api/folders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const addFile = async ({ token, folderId, file }) => {
  try {
    const res = await axios.post(`/api/folders/${folderId}/files`, file, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const deleteFolder = async (token, folderId) => {
  try {
    const res = await axios.delete(`/api/folders/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
