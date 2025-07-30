import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as z from "zod";
import UserSchema from "../schemas/UserSchema.js";

export const createUser = async (req, res, next) => {
  try {
    const { email, password } = UserSchema.parse(req.body);

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      const error = new Error("Email is already in use");
      error.statusCode = 400;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const { password: hashed, ...userData } = newUser;

    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      process.env.SECRET_JWT_KEY
    );

    return res.status(201).json({
      token,
      userData,
    });
  } catch (error) {
    next(error);
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = UserSchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      const error = new Error("User doesn't exist");
      error.statusCode = 401;
      return next(error);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      const error = "Incorrect password";
      error.statusCode = 401;
      return next(error);
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
    next(error);
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
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete",
      success: false,
    });
  }
};
