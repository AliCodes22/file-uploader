export const handleAxiosError = (error) => {
  if (!error.response) {
    return {
      success: false,
      message: "something went wrong",
      data: null,
    };
  }

  return error.response.data;
};
