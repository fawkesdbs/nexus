import express from 'express';
import { register, login, getMe, updateProfile } from '../controllers/auth.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.put('/profile', authMiddleware, updateProfile);

export default router;
