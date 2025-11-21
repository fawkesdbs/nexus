import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import meetingRoutes from './routes/meetingRoutes';
import notificationRoutes from './routes/notificationRoutes';
import courseRoutes from './routes/courseRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/courses', courseRoutes);

// Health Check
app.get("/", (req, res) => {
    res.send("API Server is running");
});

export default app;