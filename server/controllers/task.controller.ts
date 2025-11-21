import { Request, Response } from "express";
import * as taskService from "../services/task.service";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const tasks = await taskService.getTasksByEmployee(userId);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { title, details, deadline, priority } = req.body;
    
    const newTask = await taskService.createTask(userId, { title, details, deadline, priority });
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const updates = req.body;

    const updatedTask = await taskService.updateTask(taskId, userId, updates);
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    
    const success = await taskService.deleteTask(taskId, userId);
    if (!success) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete task" });
  }
};