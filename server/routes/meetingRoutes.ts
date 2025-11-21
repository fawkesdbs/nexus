import express from 'express';
import { getMeetings, createMeeting } from '../controllers/meeting.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getMeetings);
router.post('/', createMeeting);

export default router;