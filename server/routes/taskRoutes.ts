import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// All task routes are protected
router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;