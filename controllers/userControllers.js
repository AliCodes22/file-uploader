import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as z from "zod";

const UserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  dotenv.config();

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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const validateData = UserSchema.parse({
    email,
    password,
  });
  if (!email || !password) {
    return res.status(400).json({
      message: "Missing info",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.SECRET_JWT_KEY
    );

    const { password: hashedPassword, ...userData } = user;

    return res.status(200).json({
      token,
      userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
