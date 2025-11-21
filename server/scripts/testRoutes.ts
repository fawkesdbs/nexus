import dotenv from 'dotenv';
import path from 'path';

// --- Types ---
interface LoginResponse {
  token: string;
  user: any;
}

interface ApiEntity {
  id: string;
  [key: string]: any;
}

// --- Setup ---
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`; // Note: Base URL is root, API calls add /api

// Test User Credentials
const TEST_USER = {
  first_name: "Test",
  last_name: "Script",
  email: `test.script.${Date.now()}@nexus.com`,
  password: "Password123!",
  phone_number: "555-0199"
};

// --- Helper ---
const log = (step: string, message: string, success: boolean = true) => {
  const icon = success ? '✅' : '❌';
  console.log(`${icon} [${step}] ${message}`);
  if (!success) process.exit(1);
};

async function runTests() {
  console.log(`🚀 Starting API Tests against ${BASE_URL}\n`);
  
  let token = '';
  let authHeaders = {};

  // ---------------------------------------------------------
  // 0. HEALTH CHECK
  // ---------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/`);
    if (res.ok) log('Health Check', 'Server is running');
    else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Health Check', e.message, false); }

  // ---------------------------------------------------------
  // 1. AUTHENTICATION
  // ---------------------------------------------------------
  console.log("\n--- 🔐 Authentication ---");

  // Register
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER)
    });
    
    if (res.status === 201) log('Register', 'User registered successfully');
    else {
      const err = await res.json();
      // If user exists from previous run, that's fine for testing
      if (res.status === 409) log('Register', 'User already exists (Expected)', true);
      else throw new Error(`Status ${res.status}: ${JSON.stringify(err)}`);
    }
  } catch (e: any) { log('Register', e.message, false); }

  // Login
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: TEST_USER.email, password: TEST_USER.password })
    });

    if (res.ok) {
      const data = await res.json() as LoginResponse;
      token = data.token;
      log('Login', 'Authenticated & Token received');
      
      authHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    } else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Login', e.message, false); }

  // Get Me (Profile) - *ADDED*
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, { headers: authHeaders });
    if (res.ok) {
      const user = await res.json();
      log('Get Me', `Fetched profile for ${user.email}`);
    } else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Get Me', e.message, false); }

  // ---------------------------------------------------------
  // 2. TASKS
  // ---------------------------------------------------------
  console.log("\n--- 📋 Tasks ---");
  let taskId = '';

  // Create Task
  try {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: "Integration Test Task",
        details: "Testing all routes",
        deadline: new Date().toISOString(),
        priority: "high"
      })
    });
    
    if (res.status === 201) {
      const task = await res.json() as ApiEntity;
      taskId = task.id;
      log('Create Task', 'Task created');
    } else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Create Task', e.message, false); }

  // Get Tasks
  try {
    const res = await fetch(`${BASE_URL}/api/tasks`, { headers: authHeaders });
    const tasks = await res.json() as any[];
    log('Get Tasks', `Retrieved ${tasks.length} tasks`);
  } catch (e: any) { log('Get Tasks', e.message, false); }

  // Update Task
  try {
    const res = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({ status: "completed" })
    });
    if (res.ok) log('Update Task', 'Task updated');
    else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Update Task', e.message, false); }

  // Delete Task
  try {
    const res = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
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

  // Create Meeting
  try {
    const res = await fetch(`${BASE_URL}/api/meetings`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        meeting_title: "Full Coverage Test",
        transcript: "Testing all endpoints.",
        ai_summary: "Summary of test.",
        key_decisions: "Coverage is 100%.",
        action_items: "Deploy."
      })
    });
    if (res.status === 201) log('Create Meeting', 'Meeting saved');
    else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Create Meeting', e.message, false); }

  // Get Meetings
  try {
    const res = await fetch(`${BASE_URL}/api/meetings`, { headers: authHeaders });
    const meetings = await res.json() as any[];
    log('Get Meetings', `Retrieved ${meetings.length} meetings`);
  } catch (e: any) { log('Get Meetings', e.message, false); }

  // ---------------------------------------------------------
  // 4. NOTIFICATIONS
  // ---------------------------------------------------------
  console.log("\n--- 🔔 Notifications ---");
  let notifId = '';

  // Create Notification
  try {
    const res = await fetch(`${BASE_URL}/api/notifications`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: "Route Test",
        message: "Testing notifications",
        type: "info"
      })
    });
    if (res.status === 201) {
      const notif = await res.json() as ApiEntity;
      notifId = notif.id;
      log('Create Notif', 'Notification created');
    } else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Create Notif', e.message, false); }

  // Get Notifications - *ADDED*
  try {
    const res = await fetch(`${BASE_URL}/api/notifications`, { headers: authHeaders });
    const notifs = await res.json() as any[];
    const found = notifs.find(n => n.id === notifId);
    if (found) log('Get Notifs', `Retrieved notification list (Found new alert)`);
    else throw new Error('Created notification not found in list');
  } catch (e: any) { log('Get Notifs', e.message, false); }

  // Mark as Read
  try {
    const res = await fetch(`${BASE_URL}/api/notifications/${notifId}/read`, {
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

  // Create Course
  try {
    const res = await fetch(`${BASE_URL}/api/courses`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: "Full Stack Testing",
        description: "Learn to test routes",
        duration: "30 mins",
        level: "Advanced",
        instructor: "Dev Team",
        category: "DevOps",
        thumbnail: "http://example.com/img.png"
      })
    });
    if (res.status === 201) {
      const course = await res.json() as ApiEntity;
      courseId = course.id;
      log('Create Course', 'Course created');
    } else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Create Course', e.message, false); }

  // Update Progress
  try {
    const res = await fetch(`${BASE_URL}/api/courses/progress`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        courseId: courseId,
        progress: 75,
        isBookmarked: true
      })
    });
    if (res.ok) log('Update Progress', 'User progress updated');
    else throw new Error(`Status ${res.status}`);
  } catch (e: any) { log('Update Progress', e.message, false); }

  // Get Courses (Verify Progress) - *ADDED*
  try {
    const res = await fetch(`${BASE_URL}/api/courses`, { headers: authHeaders });
    const courses = await res.json() as any[];
    const myCourse = courses.find(c => c.id === courseId);
    
    if (myCourse && myCourse.progress === 75 && myCourse.isBookmarked === true) {
      log('Get Courses', 'Verified course progress persistence');
    } else {
      throw new Error('Course progress not reflected in fetch');
    }
  } catch (e: any) { log('Get Courses', e.message, false); }

  console.log("\n✨ All Server Routes Validated!");
}

runTests();