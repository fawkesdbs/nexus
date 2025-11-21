import { Request, Response } from "express";
import * as notificationService from "../services/notification.service";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const notifications = await notificationService.getNotificationsByEmployee(userId);
    res.json(notifications);
  } catch (err) {
    console.error("Get Notifications Error:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

export const createNotification = async (req: Request, res: Response) => {
  try {
    // In a real app, userId usually comes from logic, not the body, unless an admin is sending it.
    // For simplicity, we assume the logged-in user is creating it for themselves or we extract targetUserId from body.
    // Here, we'll assume we are creating a notification for the logged-in user for testing purposes.
    const userId = req.user.id;
    const { title, message, type } = req.body;

    const newNotification = await notificationService.createNotification(userId, title, message, type);
    res.status(201).json(newNotification);
  } catch (err) {
    console.error("Create Notification Error:", err);
    res.status(500).json({ error: "Failed to create notification" });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;
    
    const updated = await notificationService.markAsRead(notificationId, userId);
    
    if (!updated) {
        return res.status(404).json({ error: "Notification not found" });
    }

    res.json({ message: "Notification marked as read" });
  } catch (err) {
    console.error("Mark Read Error:", err);
    res.status(500).json({ error: "Failed to update notification" });
  }
};