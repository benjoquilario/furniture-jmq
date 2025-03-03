import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import db from '../../db';
import { verifyJwt } from '../../utils/verify-jwt';
import { StatusCodes } from 'http-status-codes';

export const refresh: RequestHandler = async (req, res) => {
  const token = req.cookies?.refreshToken;

  try {
    const decoded = verifyJwt(token);

    const user = await db.user.findUnique({
      where: {
        id: decoded.sub as string,
      },
    });

    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: 'User not found' });

      return;
    }

    const accessToken = jwt.sign(
      { sub: user.id, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' }
    );

    res.send({ accessToken, user });
  } catch (error) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};
