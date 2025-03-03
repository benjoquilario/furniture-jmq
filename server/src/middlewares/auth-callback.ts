import { RequestHandler } from 'express';
import { getUser } from '../services/getUser';

export const authCallback: RequestHandler = async (req, res, next) => {
  try {
    res.locals.user = await getUser(res.locals.userId);

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};
