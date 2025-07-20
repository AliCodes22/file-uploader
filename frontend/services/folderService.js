import axios from "axios";

export const getAllFolders = async (token) => {
  try {
    const res = await axios.get("/api/folders", {
      headers: `Bearer ${token}`,
    });

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
