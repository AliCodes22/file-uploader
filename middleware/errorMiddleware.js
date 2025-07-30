export const errorMiddleware = (error, req, res, next) => {
  console.error(error.stack);

  const statusCode = error.statusCode || 500;

  const message = error.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
