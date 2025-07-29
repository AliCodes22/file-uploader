import axios from "axios";

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
    console.log(error.message);
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
    return error.response.data;
  }
};
