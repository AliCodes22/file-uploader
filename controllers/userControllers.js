import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as z from "zod";
import UserSchema from "../schemas/UserSchema.js";

export const createUser = async (req, res) => {
  const { email, password } = UserSchema.parse(req.body);

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(400).json({
      message: "Email is already in use",
    });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      process.env.SECRET_JWT_KEY
    );
    console.log(token);

    return res.status(201).json({
      token,
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to create user",
    });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = UserSchema.parse(req.body);
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
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      message: "user deleted",
    });
  } catch (error) {}
};
