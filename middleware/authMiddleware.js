import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

const validateUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default validateUser;
