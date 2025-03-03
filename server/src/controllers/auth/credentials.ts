import db from '../../db';
import { RequestHandler } from 'express';
import { hashPassword, comparePasswords } from '../../utils/session';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { signInSchema, signUpSchema } from '../../validation/credentials';

export const createUser: RequestHandler = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } =
    signUpSchema.parse(req.body);

  try {
    const isEmailExist = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Email already exists', data: req.body });

      return;
    }

    if (password !== confirmPassword) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Passwords do not match', data: req.body });

      return;
    }

    const hashedPassword = await hashPassword(password);
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    await db.user.create({
      data: {
        role: 'USER',
        email,
        hashedPassword: hashedPassword,
        name: `${firstName} ${lastName}`,
        image: `/avatar-${randomNumber}.png`,
      },
    });

    res
      .status(StatusCodes.OK)
      .json({ message: 'User created successfully', data: req.body });
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid data', data: error });

      return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = signInSchema.parse(req.body);

  console.log('Requesting');

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Email does not exist', success: false });

      return;
    }

    const isPasswordCorrect = await comparePasswords(
      password,
      user?.hashedPassword!
    );

    if (!isPasswordCorrect) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid password', success: false });

      return;
    }

    const token = jwt.sign(
      { sub: user?.id, name: user?.name },
      process.env.JWT_SECRET!,
      {
        expiresIn: '90d',
      }
    );

    res.cookie('refreshToken', token, {
      maxAge: 30 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    });

    res
      .status(StatusCodes.OK)
      .json({ message: 'Login Successfully', success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid data', details: error });

      return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
};
