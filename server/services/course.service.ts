import { pool } from "../config/db";

export const getCoursesWithProgress = async (employeeId: string) => {
  // Performs a LEFT JOIN so we get all courses, plus any progress data if it exists for this user
  const query = `
    SELECT 
      c.*, 
      COALESCE(ucp.progress, 0) as progress, 
      COALESCE(ucp.is_bookmarked, FALSE) as "isBookmarked"
    FROM courses c
    LEFT JOIN user_course_progress ucp 
    ON c.id = ucp.course_id AND ucp.employee_id = $1
    ORDER BY c.created_at DESC
  `;
  const result = await pool.query(query, [employeeId]);
  return result.rows;
};

export const createCourse = async (data: any) => {
  const { title, description, duration, level, rating, instructor, category, thumbnail } = data;
  const query = `
    INSERT INTO courses (title, description, duration, level, rating, instructor, category, thumbnail)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  const values = [title, description, duration, level, rating || 0, instructor, category, thumbnail];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateUserProgress = async (employeeId: string, courseId: string, progress: number, isBookmarked: boolean) => {
  // UPSERT operation: Insert if not exists, Update if conflict
  const query = `
    INSERT INTO user_course_progress (employee_id, course_id, progress, is_bookmarked, last_accessed)
    VALUES ($1, $2, $3, $4, NOW())
    ON CONFLICT (employee_id, course_id) 
    DO UPDATE SET 
      progress = EXCLUDED.progress,
      is_bookmarked = EXCLUDED.is_bookmarked,
      last_accessed = NOW()
    RETURNING *
  `;
  const values = [employeeId, courseId, progress || 0, isBookmarked || false];
  const result = await pool.query(query, values);
  return result.rows[0];
};