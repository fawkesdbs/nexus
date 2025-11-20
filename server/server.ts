import app from "./app";
import dotenv from "dotenv";
import { pool } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Security Check: Ensure JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  console.error("❌ FATAL ERROR: JWT_SECRET is not defined in .env");
  process.exit(1);
}

const startServer = async () => {
  try {
    // Test Database Connection
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL");
    client.release();

    // Start Listening
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
};

startServer();