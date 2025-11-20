import { pool } from "../config/db";
import { User } from "../types/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (
  email: string,
  password: string,
  phone_number: string,
  first_name: string,
  last_name: string
): Promise<User> => {
  const client = await pool.connect();
  try {
    // Check against 'employees' table
    const checkUser = await client.query(
      "SELECT * FROM employees WHERE email = $1",
      [email]
    );
    if (checkUser.rows.length > 0) {
      throw new Error("User already registered");
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert into 'employees' with new column names
    const query = `
      INSERT INTO employees (first_name, last_name, email, password_hash, phone_number)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, first_name, last_name, email, phone_number, created_at;
    `;
    const values = [first_name, last_name, email, password_hash, phone_number];
    const result = await client.query(query, values);

    return result.rows[0];
  } finally {
    client.release();
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: User }> => {
  // Query 'employees' table
  const result = await pool.query("SELECT * FROM employees WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Remove sensitive data
  delete (user as any).password_hash;

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token, user };
};

export const getUserById = async (id: string): Promise<User | null> => {
  // Fetch employee details
  const result = await pool.query(
    "SELECT id, first_name, last_name, email, phone_number, company_name, department, role, created_at FROM employees WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
};