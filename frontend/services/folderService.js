import axios from "axios";

export const getAllFolders = async (token) => {
  try {
    const res = await axios.get("/api/folders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.message);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    throw error;
  }
};
