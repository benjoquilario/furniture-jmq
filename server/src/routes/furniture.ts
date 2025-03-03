import express from 'express';
import { verifyLogin } from '../middlewares/verify-login';
import { createFurniture } from '../controllers/furnitures/create-furnitures';

const router = express.Router();
router.use(verifyLogin);

router.post('/create', createFurniture);

export { router as furnitureRouter };
