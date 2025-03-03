import { RequestHandler } from 'express';
import { verifyJwt } from '../utils/verify-jwt';
import { StatusCodes } from 'http-status-codes';

export const verifyLogin: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  console.log(authHeader);

  if (authHeader) {
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);

      try {
        const payload = verifyJwt(token);
        
        res.locals.userId = payload.sub;
      } catch (error) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: 'Access token is not valid' });

        return;
      }
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Invalid token format' });

      return;
    }
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Authorization header is missing' });

    return;
  }

  next();
};
