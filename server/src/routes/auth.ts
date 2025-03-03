import express from 'express';
import { login, createUser } from '../controllers/auth/credentials';
import { refresh } from '../controllers/auth/refresh';
import { logout } from '../controllers/auth/logout';

const router = express.Router();

router.post('/login', login);
router.post('/register', createUser);
router.post('/refresh', refresh);
router.get('/logout', logout);

export { router as authRouter };
