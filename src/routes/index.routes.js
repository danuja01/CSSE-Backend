import express from 'express';
// eslint-disable-next-line import/order
import { protect } from '@/middleware/auth';
import authRouter from './auth.routes';
import cardRouter from './card.routes';
import userRouter from './user.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', protect, userRouter);
router.use('/cards', protect, cardRouter);

export default router;
