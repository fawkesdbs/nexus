import { pool } from "../config/db";

export const getNotificationsByEmployee = async (employeeId: string) => {
  const query = `
    SELECT * FROM notifications 
    WHERE employee_id = $1 
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query, [employeeId]);
  return result.rows;
};

export const createNotification = async (employeeId: string, title: string, message: string, type: string) => {
  const query = `
    INSERT INTO notifications (employee_id, title, message, type)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [employeeId, title, message, type || 'info'];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const markAsRead = async (notificationId: string, employeeId: string) => {
  const query = `
    UPDATE notifications 
    SET is_read = TRUE 
    WHERE id = $1 AND employee_id = $2
    RETURNING *
  `;
  const result = await pool.query(query, [notificationId, employeeId]);
  return result.rows[0];
};