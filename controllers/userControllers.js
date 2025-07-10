import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);

  if (!email || !password) {
    return res.status(400).json({
      message: "Missing info",
    });
  }

  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
