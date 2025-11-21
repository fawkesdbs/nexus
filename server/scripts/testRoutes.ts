import dotenv from 'dotenv';
import path from 'path';

// specific types for our API responses to ensure type safety in the test
interface LoginResponse {
  token: string;
  user: any;
}

interface ApiEntity {
  id: string;
  [key: string]: any;
}

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}/api`;

// Test User Credentials
const TEST_USER = {
  first_name: "Test",
  last_name: "Script",
  email: `test.script.${Date.now()}@nexus.com`, // Unique email each run
  password: "Password123!",
  phone_number: "555-0199"
};

// Helper for logging
const log = (step: string, message: string, success: boolean = true) => {
  const icon = success ? '✅' : '❌';
  console.log(`${icon} [${step}] ${message}`);
  if (!success) process.exit(1);
};

async function runTests() {
  console.log(`🚀 Starting API Tests against ${BASE_URL}\n`);
  
  let token = '';
  let userId = '';

  // ---------------------------------------------------------
  // 1. AUTHENTICATION
  // ---------------------------------------------------------
  console.log("--- 🔐 Authentication ---");

  // Register
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER)
    });
    
    if (res.status === 201) {
      log('Register', 'User registered successfully');
    } else {
      const err = await res.json();
      throw new Error(`Status ${res.status}: ${JSON.stringify(err)}`);
    }
  } catch (error: any) {
    log('Register', `Failed: ${error.message}`, false);
  }

  // Login
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: TEST_USER.email, password: TEST_USER.password })
    });

    if (res.ok) {
      const data = await res.json() as LoginResponse;
      token = data.token;
      userId = data.user.id;
      log('Login', 'Authenticated & Token received');
    } else {
      throw new Error(`Login failed with status ${res.status}`);
    }
  } catch (error: any) {
    log('Login', `Failed: ${error.message}`, false);
  }

  // Headers for protected routes
  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // ---------------------------------------------------------
  // 2. TASKS
  // ---------------------------------------------------------
  console.log("\n--- 📋 Tasks ---");
  let taskId = '';

  // Create Task
  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: "TS Script Task",
        details: "Testing via TypeScript",
        deadline: new Date().toISOString(),
        priority: "high"
      })
    });
    
    if (res.status === 201) {
      const task = await res.json() as ApiEntity;
      taskId = task.id;
      log('Create Task', 'Task created');
    } else {
      throw new Error(`Status ${res.status}`);
    }
  } catch (e: any) { log('Create Task', e.message, false); }

  // Get Tasks
  try {
    const res = await fetch(`${BASE_URL}/tasks`, { headers: authHeaders });
    const tasks = await res.json() as any[];
    log('Get Tasks', `Retrieved ${tasks.length} tasks`);
  } catch (e: any) { log('Get Tasks', e.message, false); }

  // Update Task
  try {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({ status: "completed" })
    });
    if (res.ok) log('Update Task', 'Task marked completed');
    else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Update Task', e.message, false); }

  // Delete Task
  try {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    if (res.ok) log('Delete Task', 'Task deleted');
    else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Delete Task', e.message, false); }

  // ---------------------------------------------------------
  // 3. MEETINGS
  // ---------------------------------------------------------
  console.log("\n--- 📅 Meetings ---");

  try {
    const res = await fetch(`${BASE_URL}/meetings`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        meeting_title: "TS Sync",
        transcript: "Testing meeting endpoints.",
        ai_summary: "Summary of test.",
        key_decisions: "Go with TypeScript.",
        action_items: "Commit code."
      })
    });
    if (res.status === 201) log('Create Meeting', 'Meeting summary saved');
    else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Create Meeting', e.message, false); }

  try {
    const res = await fetch(`${BASE_URL}/meetings`, { headers: authHeaders });
    const meetings = await res.json() as any[];
    log('Get Meetings', `Retrieved ${meetings.length} meetings`);
  } catch (e: any) { log('Get Meetings', e.message, false); }

  // ---------------------------------------------------------
  // 4. NOTIFICATIONS
  // ---------------------------------------------------------
  console.log("\n--- 🔔 Notifications ---");
  let notifId = '';

  try {
    const res = await fetch(`${BASE_URL}/notifications`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: "Test Alert",
        message: "This is a test notification",
        type: "info"
      })
    });
    if (res.status === 201) {
      const notif = await res.json() as ApiEntity;
      notifId = notif.id;
      log('Create Notif', 'Notification created');
    } else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Create Notif', e.message, false); }

  try {
    const res = await fetch(`${BASE_URL}/notifications/${notifId}/read`, {
      method: 'PUT',
      headers: authHeaders
    });
    if (res.ok) log('Mark Read', 'Notification marked as read');
    else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Mark Read', e.message, false); }

  // ---------------------------------------------------------
  // 5. COURSES
  // ---------------------------------------------------------
  console.log("\n--- 📚 Courses ---");
  let courseId = '';

  // Admin Create Course
  try {
    const res = await fetch(`${BASE_URL}/courses`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: "TypeScript 101",
        description: "Intro to TS",
        duration: "1 hour",
        level: "Beginner",
        instructor: "Nexus AI",
        category: "Programming",
        thumbnail: "http://example.com/img.png"
      })
    });
    if (res.status === 201) {
      const course = await res.json() as ApiEntity;
      courseId = course.id;
      log('Create Course', 'Course created');
    } else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Create Course', e.message, false); }

  // User Progress
  try {
    const res = await fetch(`${BASE_URL}/courses/progress`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        courseId: courseId,
        progress: 10,
        isBookmarked: true
      })
    });
    if (res.ok) log('Update Progress', 'Progress updated');
    else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Update Progress', e.message, false); }

  console.log("\n✨ All TypeScript API tests passed successfully!");
}

runTests();