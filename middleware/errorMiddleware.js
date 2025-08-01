import { ZodError } from "zod";

export const errorMiddleware = (error, req, res, next) => {
  console.error(error.stack);

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "invalid input",
    });
  }

  const statusCode = error.statusCode || 500;

  const message = error.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
