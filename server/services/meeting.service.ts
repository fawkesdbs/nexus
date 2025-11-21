import { pool } from "../config/db";

export const getMeetingsByEmployee = async (employeeId: string) => {
  // Returns the latest meeting first
  const query = `
    SELECT * FROM meeting_summaries 
    WHERE employee_id = $1 
    ORDER BY created_at DESC 
    LIMIT 5
  `;
  const result = await pool.query(query, [employeeId]);
  return result.rows;
};

export const createMeeting = async (employeeId: string, data: any) => {
  const { meeting_title, transcript, ai_summary, key_decisions, action_items } = data;
  const query = `
    INSERT INTO meeting_summaries 
    (employee_id, meeting_title, transcript, ai_summary, key_decisions, action_items)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [employeeId, meeting_title, transcript, ai_summary, key_decisions, action_items];
  const result = await pool.query(query, values);
  return result.rows[0];
};