import axios from "axios";
import { handleAxiosError } from "./handleAxiosError";

export const registerUser = async (email, password) => {
  try {
    const res = await axios.post(
      "/api/user/sign-up",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(
      "/api/user/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
