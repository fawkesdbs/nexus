import { Request, Response } from "express";
import * as meetingService from "../services/meeting.service";

export const getMeetings = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const meetings = await meetingService.getMeetingsByEmployee(userId);
    res.json(meetings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch meetings" });
  }
};

export const createMeeting = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const newMeeting = await meetingService.createMeeting(userId, req.body);
    res.status(201).json(newMeeting);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save meeting summary" });
  }
};