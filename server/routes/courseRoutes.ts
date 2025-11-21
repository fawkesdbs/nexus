import express from 'express';
import { getCourses, createCourse, updateProgress } from '../controllers/course.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getCourses);
router.post('/', createCourse); // Admin function generally
router.post('/progress', updateProgress);

export default router;