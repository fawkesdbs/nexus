import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Health Check
app.get("/", (req, res) => {
    res.send("API Server is running");
});

export default app;