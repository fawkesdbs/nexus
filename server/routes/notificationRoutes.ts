import express from 'express';
import { getNotifications, createNotification, markAsRead } from '../controllers/notification.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getNotifications);
router.post('/', createNotification);
router.put('/:id/read', markAsRead);

export default router;