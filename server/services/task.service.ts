import { pool } from "../config/db";

export const getTasksByEmployee = async (employeeId: string) => {
  const query = `
    SELECT * FROM tasks 
    WHERE employee_id = $1 
    ORDER BY deadline ASC
  `;
  const result = await pool.query(query, [employeeId]);
  return result.rows;
};

export const createTask = async (employeeId: string, data: any) => {
  const { title, details, deadline, priority } = data;
  const query = `
    INSERT INTO tasks (employee_id, title, details, deadline, priority, status)
    VALUES ($1, $2, $3, $4, $5, 'pending')
    RETURNING *
  `;
  const values = [employeeId, title, details, deadline, priority || 'medium'];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateTask = async (taskId: string, employeeId: string, updates: any) => {
  // Dynamic update query builder
  const fields = Object.keys(updates);
  if (fields.length === 0) return null;

  const setClause = fields.map((field, idx) => `${field} = $${idx + 3}`).join(', ');
  const query = `
    UPDATE tasks 
    SET ${setClause} 
    WHERE id = $1 AND employee_id = $2
    RETURNING *
  `;
  
  const values = [taskId, employeeId, ...fields.map(f => updates[f])];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteTask = async (taskId: string, employeeId: string) => {
  const query = "DELETE FROM tasks WHERE id = $1 AND employee_id = $2";
  const result = await pool.query(query, [taskId, employeeId]);
  return result.rowCount ? result.rowCount > 0 : false;
};