import axios from "axios";

export const downloadFile = async (token, fileId) => {
  try {
    const res = await axios.get(`/api/files/${fileId}/download`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
