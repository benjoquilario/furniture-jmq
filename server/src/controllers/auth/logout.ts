import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const logout: RequestHandler = async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Unauthorized' });

    return;
  }

  res.clearCookie('refreshToken', { httpOnly: true, path: '/auth/refresh' });
  res.sendStatus(StatusCodes.OK);
};
