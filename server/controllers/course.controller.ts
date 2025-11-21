import { Request, Response } from "express";
import * as courseService from "../services/course.service";

export const getCourses = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    // We fetch courses merged with this specific user's progress
    const courses = await courseService.getCoursesWithProgress(userId);
    res.json(courses);
  } catch (err) {
    console.error("Get Courses Error:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const newCourse = await courseService.createCourse(req.body);
    res.status(201).json(newCourse);
  } catch (err) {
    console.error("Create Course Error:", err);
    res.status(500).json({ error: "Failed to create course" });
  }
};

export const updateProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { courseId, progress, isBookmarked } = req.body;

    if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
    }

    const updated = await courseService.updateUserProgress(userId, courseId, progress, isBookmarked);
    res.json(updated);
  } catch (err) {
    console.error("Update Progress Error:", err);
    res.status(500).json({ error: "Failed to update course progress" });
  }
};