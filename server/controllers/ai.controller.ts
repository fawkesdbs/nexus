import { Request, Response } from "express";

// URL of the Python AI Service
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || "http://localhost:5000";

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Forward the request to the Python Service
    // This keeps the API key and logic isolated in Python
    const response = await fetch(`${PYTHON_SERVICE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Python service error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (err: any) {
    console.error("AI Proxy Error:", err.message);
    res.status(500).json({ error: "Failed to communicate with AI service" });
  }
};