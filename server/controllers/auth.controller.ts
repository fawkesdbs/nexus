import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    // Destructure new fields (first_name, last_name) instead of name/surname
    const { email, password, phone_number, first_name, last_name } = req.body;

    if (!email || !password || !phone_number || !first_name || !last_name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await authService.registerUser(
      email,
      password,
      phone_number,
      first_name,
      last_name
    );

    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (err: any) {
    if (err.message && err.message.includes("User already registered")) {
      return res
        .status(409)
        .json({ error: "A user with this email already exists." });
    }

    console.error("Register controller error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { token, user } = await authService.loginUser(email, password);

    return res.status(200).json({ token, user });
  } catch (err: any) {
    console.error("Login controller error:", err);
    return res.status(401).json({ error: "Invalid email or password" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No user ID found in token." });
    }

    const user = await authService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("GetMe controller error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};