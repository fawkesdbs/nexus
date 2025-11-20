import React, { useState, useEffect, useRef } from "react";
import {
  LogOut,
  PenLine,
  Phone,
  Mail,
  Users,
  Briefcase,
  Hash,
  Star,
  User,
  ListChecks,
  Calendar,
  MessageSquare,
  Bell,
  Zap,
  Bot,
  AlertTriangle,
  CheckCircle,
  Image as ImageIcon,
  Plus,
  History,
  X,
  Check,
  Clock,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// --- Type Definitions ---

interface Profile {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  department: string;
  employeeNumber: string;
  role: string;
  companyName: string;
  profileImageUrl: string;
}

interface Task {
  id: string;
  title: string;
  summary: string;
  teamMembers: string;
  deadline: string; // YYYY-MM-DD
  isCompleted: boolean;
  dateCreated: string;
  dateCompleted?: string;
}

interface ScheduleItem {
  id: string;
  title: string;
  venue: string;
  dateTime: string;
}

interface ChatMessage {
  id: number;
  sender: "self" | "other";
  name: string;
  text: string;
  timestamp: string;
}

interface ChatGroup {
  id: "department" | "company";
  name: string;
  members: string[];
  messages: ChatMessage[];
}

interface Notification {
  id: number;
  message: string;
  type: "alert" | "info";
  time: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

// --- Static Data ---

const initialProfile: Profile = {
  firstName: "Aisha",
  lastName: "Jele",
  gender: "Female",
  email: "aisha.jele@lightstars.co.za",
  phone: "+27 82 555 1234",
  department: "Cloud Operations",
  employeeNumber: "LS-9001",
  role: "Senior Data Architect",
  companyName: "LightStars Technology Inc.",
  profileImageUrl: "https://placehold.co/150x150/4f46e5/ffffff?text=AJ",
};

const initialTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Review Q3 Architecture Proposal",
    summary:
      "Final check for compliance and scalability before submission to the board.",
    teamMembers: "Aisha, John, Jane",
    deadline: "2025-12-15",
    isCompleted: false,
    dateCreated: "2025-11-01",
  },
  {
    id: crypto.randomUUID(),
    title: "Update Deployment Scripts",
    summary:
      "Migrate existing bash scripts to Ansible playbooks for environment consistency.",
    teamMembers: "Aisha, David",
    deadline: "2025-11-25",
    isCompleted: false,
    dateCreated: "2025-11-10",
  },
];

const completedTasksMock: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Setup New Monitoring Alerts",
    summary: "Configure alerts for low disk space on all production servers.",
    teamMembers: "Aisha",
    deadline: "2025-11-18",
    isCompleted: true,
    dateCreated: "2025-11-15",
    dateCompleted: "2025-11-19",
  },
];

const footerMessages = [
  "Procrastination is the enemy of progress",
  "Proper prior planning prevents poor performance",
  "Failing to plan = planning to fail",
  "Every finish line is the beginning of a new race",
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Star, color: "text-yellow-400" },
  { id: "tasks", label: "Tasks", icon: ListChecks, color: "text-green-400" },
  { id: "schedule", label: "Schedule", icon: Calendar, color: "text-cyan-400" },
  {
    id: "comms",
    label: "Communication Channel",
    icon: MessageSquare,
    color: "text-purple-400",
  },
];

const mockScheduleItems: ScheduleItem[] = [
  {
    id: "s1",
    title: "Daily Cloud Ops Standup",
    venue: "Zoom Call (ID: 123-456)",
    dateTime: "2025-11-20T08:30:00",
  },
  {
    id: "s2",
    title: "Q3 Architecture Review",
    venue: "Conference Room B",
    dateTime: "2025-11-20T11:00:00",
  },
  {
    id: "s3",
    title: "1:1 with Senior Manager",
    venue: "Office 401",
    dateTime: "2025-11-20T14:00:00",
  },
  {
    id: "s4",
    title: "Security Patch Rollout",
    venue: "Remote",
    dateTime: "2025-11-21T09:00:00",
  },
  {
    id: "s5",
    title: "Team Lunch",
    venue: "The Bistro",
    dateTime: "2025-11-21T13:00:00",
  },
  {
    id: "s6",
    title: "Database Migration Planning",
    venue: "MS Teams Meeting",
    dateTime: "2025-11-22T10:00:00",
  },
  {
    id: "s7",
    title: "Budget Planning Submission",
    venue: "Finance Portal",
    dateTime: "2025-11-25T17:00:00",
  },
  {
    id: "s8",
    title: "Monthly Project Sync (Dec)",
    venue: "Zoom Call (ID: 789-012)",
    dateTime: "2025-12-01T09:30:00",
  },
];

const mockDepartmentGroup: ChatGroup = {
  id: "department",
  name: "Cloud Ops Team: Daily Grind ☁",
  members: [
    "Aisha Jele (You)",
    "John Smith",
    "Jane Doe",
    "David Chen",
    "Emily Ross",
  ],
  messages: [
    {
      id: 1,
      sender: "other",
      name: "David Chen",
      text: "Morning all. Patching report for S03 is ready on the shared drive.",
      timestamp: "08:15",
    },
    {
      id: 2,
      sender: "other",
      name: "John Smith",
      text: "Thanks, David. Need eyes on the Q3 proposal architecture this afternoon.",
      timestamp: "11:05",
    },
    {
      id: 3,
      sender: "self",
      name: "Aisha Jele",
      text: "I have the final compliance check scheduled for 14:00 today. Will provide feedback right after.",
      timestamp: "11:15",
    },
    {
      id: 4,
      sender: "other",
      name: "Emily Ross",
      text: "The new Ansible playbooks are running smoothly. Less manual intervention needed!",
      timestamp: "16:30",
    },
    {
      id: 5,
      sender: "self",
      name: "Aisha Jele",
      text: "Great news, Emily! I'm updating the documentation now based on the successful runs.",
      timestamp: "18:10",
    },
  ],
};

const mockCompanyGroup: ChatGroup = {
  id: "company",
  name: "LightStars All-Hands 🌟",
  members: [
    "Aisha Jele (You)",
    "CEO - Mark T.",
    "HR - Sarah K.",
    "Finance - Chris B.",
    "... and 40 others",
  ],
  messages: [
    {
      id: 101,
      sender: "other",
      name: "CEO - Mark T.",
      text: "Reminder: All staff meeting tomorrow at 10 AM regarding Q4 strategy.",
      timestamp: "10:00",
    },
    {
      id: 102,
      sender: "other",
      name: "HR - Sarah K.",
      text: "Annual leave forms deadline is next Friday. Please submit on time!",
      timestamp: "14:45",
    },
    {
      id: 103,
      sender: "self",
      name: "Aisha Jele",
      text: "Confirmed attendance for tomorrow's strategy meeting.",
      timestamp: "15:15",
    },
    {
      id: 104,
      sender: "other",
      name: "Finance - Chris B.",
      text: "Expense portal is temporarily offline for maintenance until 7 PM.",
      timestamp: "17:50",
    },
  ],
};

const mockChatData = [mockDepartmentGroup, mockCompanyGroup];

const mockNotifications: Notification[] = [
  {
    id: 1,
    message: "Server S01 reached 90% utilization.",
    type: "alert",
    time: "5m ago",
  },
  {
    id: 2,
    message: "Task 'Deployment Scripts' marked complete.",
    type: "info",
    time: "1h ago",
  },
  {
    id: 3,
    message: "New security patch available for review.",
    type: "alert",
    time: "4h ago",
  },
];

const PERFORMANCE_SCORE = 85;

// --- Helper Functions ---

const getInitials = (firstName: string, lastName: string): string => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : "";
  const last = lastName ? lastName.charAt(0).toUpperCase() : "";
  return (first + last).trim() || "UN";
};

const getPriorityColor = (
  deadline: string
): { color: string; label: string } => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1)
    return {
      color: "border-red-500 bg-red-900/30",
      label: "High Priority (Urgent)",
    };
  if (diffDays <= 7)
    return {
      color: "border-yellow-500 bg-yellow-900/30",
      label: "Medium Priority",
    };
  return { color: "border-blue-500 bg-blue-900/30", label: "Low Priority" };
};

// --- Reusable Components ---

interface ProfileFieldProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  isEditable?: boolean;
  onUpdate?: (key: string, newValue: string) => void;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  icon: Icon,
  label,
  value,
  isEditable = false,
  onUpdate = () => {},
}) => {
  const [currentValue, setCurrentValue] = useState<string>(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const inputType = label.toLowerCase().includes("email")
    ? "email"
    : label.toLowerCase().includes("phone")
    ? "tel"
    : label.toLowerCase().includes("date")
    ? "date"
    : "text";

  const isLocked = label === "Company Name";

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-xs font-semibold uppercase text-gray-400 flex items-center">
        <Icon className="w-3 h-3 mr-1 text-blue-400" />
        {label}
      </label>

      {isLocked || !isEditable ? (
        <p
          className={`text-gray-100 font-medium text-lg ${
            isLocked ? "italic" : ""
          }`}
        >
          {value || "N/A"}
        </p>
      ) : (
        <input
          type={inputType}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={() => onUpdate(label.replace(/\s/g, ""), currentValue)}
          className="bg-gray-700 text-gray-100 p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150"
        />
      )}
    </div>
  );
};

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  isHistory?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  isHistory = false,
}) => {
  const { color, label } = getPriorityColor(task.deadline);

  return (
    <div
      className={`p-5 rounded-xl shadow-lg border-l-4 transition transform hover:scale-[1.01] ${color}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xl font-bold text-white">{task.title}</h4>
        {!isHistory && (
          <button
            onClick={() => onComplete(task.id)}
            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded-full hover:bg-green-700 transition shadow-md"
            title="Mark as Complete"
          >
            <Check className="w-4 h-4" />
            <span className="hidden sm:inline">Done</span>
          </button>
        )}
      </div>

      <p className="text-sm text-gray-300 mb-3 italic">{task.summary}</p>

      <div className="text-sm space-y-1">
        <div className="flex items-center text-gray-400">
          <UserPlus className="w-4 h-4 mr-2 text-blue-300" />
          <span className="font-semibold">Team:</span>{" "}
          {task.teamMembers || "Solo"}
        </div>
        <div className="flex items-center text-gray-400">
          <Clock className="w-4 h-4 mr-2 text-yellow-300" />
          <span className="font-semibold">Due:</span> {task.deadline}
        </div>
        {isHistory && task.dateCompleted && (
          <div className="flex items-center text-gray-400">
            <CheckCircle className="w-4 h-4 mr-2 text-lime-400" />
            <span className="font-semibold">Completed:</span>{" "}
            {task.dateCompleted}
          </div>
        )}
        <div className="text-xs pt-1 text-gray-500">
          {isHistory ? `Created: ${task.dateCreated}` : `Priority: ${label}`}
        </div>
      </div>
    </div>
  );
};

const TasksComponent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [completedTasks, setCompletedTasks] =
    useState<Task[]>(completedTasksMock);
  const [viewMode, setViewMode] = useState<"list" | "add" | "history">("list");
  const [newTask, setNewTask] = useState<
    Omit<Task, "id" | "isCompleted" | "dateCreated">
  >({
    title: "",
    summary: "",
    teamMembers: "",
    deadline: new Date().toISOString().split("T")[0],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.summary || !newTask.deadline) {
      console.error(
        "Validation Error: Title, summary, and deadline are required!"
      );
      return;
    }

    const taskToAdd: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      isCompleted: false,
      dateCreated: new Date().toISOString().split("T")[0],
    };

    setTasks((prev) => [...prev, taskToAdd]);
    setNewTask({
      title: "",
      summary: "",
      teamMembers: "",
      deadline: new Date().toISOString().split("T")[0],
    });
    setViewMode("list");
  };

  const handleCompleteTask = (id: string) => {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex > -1) {
      const completedTask = {
        ...tasks[taskIndex],
        isCompleted: true,
        dateCompleted: new Date().toISOString().split("T")[0],
      };

      const newActiveTasks = tasks.filter((t) => t.id !== id);

      setTasks(newActiveTasks);
      setCompletedTasks((prev) => [...prev, completedTask]);
    }
  };

  const commonClasses =
    "p-6 rounded-xl shadow-xl bg-gray-800 flex flex-col h-full";

  const renderActiveTasks = () => (
    <>
      <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center">
        <ListChecks className="w-5 h-5 mr-2" /> Active Task List ({tasks.length}
        )
      </h3>
      <div className="grow space-y-4 overflow-y-auto pr-2">
        {tasks.length === 0 ? (
          <div className="text-center p-8 bg-gray-700/50 rounded-lg text-gray-400">
            <p>
              No active tasks right now. Click 'Add New Task' to create one!
            </p>
          </div>
        ) : (
          tasks
            .sort(
              (a, b) =>
                new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
            )
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleCompleteTask}
              />
            ))
        )}
      </div>
    </>
  );

  const renderAddTaskForm = () => (
    <>
      <h3 className="text-xl font-bold text-blue-300 mb-6 flex items-center">
        <Plus className="w-5 h-5 mr-2" /> Add New Task
      </h3>
      <form
        onSubmit={handleAddNewTask}
        className="grow space-y-4 overflow-y-auto pr-2"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Task Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={newTask.title}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Task Summary *
          </label>
          <textarea
            name="summary"
            id="summary"
            rows={3}
            value={newTask.summary}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="teamMembers"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Team Members (Optional, e.g., John, Jane)
          </label>
          <input
            type="text"
            name="teamMembers"
            id="teamMembers"
            value={newTask.teamMembers}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Deadline *
          </label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={newTask.deadline}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>ADD TASK</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className="mt-3 w-full flex items-center justify-center space-x-2 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition"
          >
            <X className="w-5 h-5" />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </>
  );

  const renderTaskHistory = () => (
    <>
      <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center">
        <History className="w-5 h-5 mr-2" /> Task History (
        {completedTasks.length})
      </h3>
      <div className="grow space-y-4 overflow-y-auto pr-2">
        {completedTasks.length === 0 ? (
          <div className="text-center p-8 bg-gray-700/50 rounded-lg text-gray-400">
            <p>No tasks have been completed yet.</p>
          </div>
        ) : (
          completedTasks
            .sort(
              (a, b) =>
                new Date(b.dateCompleted || 0).getTime() -
                new Date(a.dateCompleted || 0).getTime()
            )
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={() => {}}
                isHistory={true}
              />
            ))
        )}
      </div>
    </>
  );

  return (
    <div className={commonClasses}>
      <div className="grow min-h-0 overflow-y-auto pr-2">
        {viewMode === "list" && renderActiveTasks()}
        {viewMode === "add" && renderAddTaskForm()}
        {viewMode === "history" && renderTaskHistory()}
      </div>

      <div className="shrink-0 mt-6 pt-4 border-t border-gray-700 flex space-x-4">
        <button
          onClick={() => setViewMode("add")}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 w-1/2 justify-center
                        ${
                          viewMode === "add"
                            ? "bg-blue-800 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }
                    `}
          disabled={viewMode === "add"}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Task</span>
        </button>
        <button
          onClick={() => setViewMode("history")}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 w-1/2 justify-center
                        ${
                          viewMode === "history"
                            ? "bg-yellow-800 text-white"
                            : "bg-yellow-600 hover:bg-yellow-700 text-white"
                        }
                    `}
          disabled={viewMode === "history"}
        >
          <History className="w-4 h-4" />
          <span>Task History</span>
        </button>
      </div>

      {viewMode !== "list" && viewMode !== "history" && (
        <div className="shrink-0 mt-4">
          <button
            onClick={() => setViewMode("list")}
            className="w-full flex items-center justify-center space-x-2 py-2 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition"
          >
            <ListChecks className="w-4 h-4" />
            <span>Back to Active Tasks</span>
          </button>
        </div>
      )}
    </div>
  );
};

const ScheduleComponent: React.FC = () => {
  const [filter, setFilter] = useState<"today" | "week" | "month">("today");

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filterTasks = (items: ScheduleItem[]): ScheduleItem[] => {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    return items
      .filter((item) => {
        const itemDate = new Date(item.dateTime);
        if (itemDate < startOfToday) return false;

        if (filter === "today") {
          return itemDate.toDateString() === now.toDateString();
        }

        if (filter === "week") {
          const endOfWeek = new Date(startOfToday);
          endOfWeek.setDate(startOfToday.getDate() + 7);

          return itemDate < endOfWeek;
        }

        if (filter === "month") {
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          endOfMonth.setDate(endOfMonth.getDate() + 1);
          return itemDate < endOfMonth;
        }

        return false;
      })
      .sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
  };

  const filteredItems = filterTasks(mockScheduleItems);
  const commonClasses =
    "p-6 rounded-xl shadow-xl bg-gray-800 flex flex-col h-full";

  const filterButtonClasses = (isActive: boolean) =>
    `px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 
         ${
           isActive
             ? "bg-cyan-600 text-white shadow-lg"
             : "bg-gray-700 text-gray-300 hover:bg-gray-600"
         }`;

  return (
    <div className={commonClasses + " overflow-y-auto"}>
      <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2" /> Upcoming Tasks
      </h3>

      <div className="flex space-x-3 mb-6 flex-wrap">
        <button
          onClick={() => setFilter("today")}
          className={filterButtonClasses(filter === "today")}
        >
          Today
        </button>
        <button
          onClick={() => setFilter("week")}
          className={filterButtonClasses(filter === "week")}
        >
          This Week
        </button>
        <button
          onClick={() => setFilter("month")}
          className={filterButtonClasses(filter === "month")}
        >
          This Month
        </button>
      </div>

      <div className="grow min-h-0 overflow-y-auto pr-2">
        {filteredItems.length === 0 ? (
          <div className="text-center p-8 bg-gray-700/50 rounded-lg text-gray-400">
            <p>
              No upcoming tasks scheduled for *
              {filter
                .toUpperCase()
                .replace("WEEK", "7 DAYS")
                .replace("MONTH", "30 DAYS")}
              *.
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Task Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  Venue/Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-700/50 transition duration-150"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {item.title}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 hidden sm:table-cell">
                    {item.venue}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(item.dateTime)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-cyan-400">
                    {formatTime(item.dateTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const CommsComponent: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<"department" | "company">(
    "department"
  );
  const chatRef = useRef<HTMLDivElement>(null);

  const currentGroup =
    mockChatData.find((g) => g.id === activeGroup) || mockDepartmentGroup;

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [currentGroup.messages]);

  const commonClasses =
    "p-6 rounded-xl shadow-xl bg-gray-800 flex flex-col h-full";
  const buttonClasses = (id: string) =>
    `flex-1 px-3 py-2 text-sm font-semibold rounded-t-lg transition duration-200 text-center 
         ${
           activeGroup === id
             ? "bg-gray-700 text-purple-300 border-b-2 border-purple-500"
             : "bg-gray-800 text-gray-400 hover:bg-gray-700/50"
         }`;

  return (
    <div className={commonClasses}>
      <div className="flex w-full border-b border-gray-700">
        <button
          onClick={() => setActiveGroup("department")}
          className={buttonClasses("department")}
        >
          <Users className="w-4 h-4 inline mr-1" /> {mockDepartmentGroup.name}
        </button>
        <button
          onClick={() => setActiveGroup("company")}
          className={buttonClasses("company")}
        >
          <Briefcase className="w-4 h-4 inline mr-1" /> {mockCompanyGroup.name}
        </button>
      </div>

      <div className="p-3 bg-gray-700/70 border-b border-gray-700 text-xs text-gray-400">
        <span className="font-bold text-gray-200">
          Members ({currentGroup.members.length}):{" "}
        </span>
        {currentGroup.members.slice(0, 5).join(", ")}
        {currentGroup.members.length > 5 && "..."}
      </div>

      <div
        ref={chatRef}
        className="grow p-4 space-y-4 overflow-y-auto bg-gray-900/50 rounded-b-xl min-h-0"
      >
        {currentGroup.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "self" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-xl shadow-lg ${
                msg.sender === "self"
                  ? "bg-green-700/80 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-100 rounded-tl-none"
              }`}
            >
              {msg.sender === "other" && (
                <p
                  className="text-sm font-bold mb-1"
                  style={{
                    color: msg.name === "John Smith" ? "#4f46e5" : "#10b981",
                  }}
                >
                  {msg.name}
                </p>
              )}

              <p className="text-sm">{msg.text}</p>

              <div
                className={`text-xs mt-1 ${
                  msg.sender === "self" ? "text-gray-200/70" : "text-gray-400"
                }`}
              >
                {msg.timestamp} <Check className="w-3 h-3 inline ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="shrink-0 pt-4 flex space-x-2">
        <input
          type="text"
          placeholder={`Message ${currentGroup.name}...`}
          className="grow bg-gray-700 text-gray-100 p-3 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
        />
        <button className="p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition cursor-pointer">
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

interface ContentWindowProps {
  selectedItem: string;
}

const ContentWindow: React.FC<ContentWindowProps> = ({ selectedItem }) => {
  const commonClasses =
    "p-6 rounded-xl shadow-xl bg-gray-800 h-full flex flex-col";

  switch (selectedItem) {
    case "dashboard":
      return (
        <div className={commonClasses + " overflow-y-auto"}>
          <h3 className="text-xl font-bold text-yellow-300 mb-4">
            Welcome to Your LightStars Hub
          </h3>
          <p className="text-gray-300">
            This centralized dashboard provides a real-time snapshot of your
            operational environment. Monitor key metrics, track project
            progress, and manage your schedule from one interface.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-400">Total Projects</p>
              <p className="text-2xl font-bold">15</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-400">Data Pipeline Health</p>
              <p className="text-2xl font-bold text-green-400">Optimal</p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 space-y-3">
            <h4 className="text-lg font-semibold text-gray-200">
              Recent Activity Log (Scroll Test)
            </h4>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="text-sm text-gray-400">
                <span className="text-gray-500">
                  [{`2025-11-${20 - (i % 5)} 10:${10 + i} AM`}]
                </span>
                Data ingestion job completed successfully for region {i % 4}.
              </p>
            ))}
          </div>
        </div>
      );
    case "tasks":
      return <TasksComponent />;
    case "schedule":
      return <ScheduleComponent />;
    case "comms":
      return <CommsComponent />;
    default:
      return (
        <div className={commonClasses}>
          <p className="text-gray-400">
            Select an item from the navigation bar.
          </p>
        </div>
      );
  }
};

interface PerformanceTrackerProps {
  score: number;
}

const PerformanceTracker: React.FC<PerformanceTrackerProps> = ({ score }) => {
  const isImproving = score >= 75;
  const tailwindColor = isImproving ? "text-lime-500" : "text-red-500";
  const strokeColor = isImproving ? "stroke-lime-500" : "stroke-red-500";
  const arcLength = (score / 100) * 283;

  return (
    <div className="p-6 rounded-xl shadow-xl flex flex-col items-center justify-center space-y-3 h-full bg-gray-800">
      <h3 className="text-md font-semibold text-gray-300 flex items-center space-x-2">
        <Zap className="w-4 h-4 text-blue-400" />
        <span>Performance Score</span>
      </h3>
      <div className="relative w-36 h-36">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full transform -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#4B5563"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="10"
            className={strokeColor}
            strokeLinecap="round"
            style={{
              strokeDasharray: `${arcLength} 283`,
              transition: "stroke-dasharray 0.8s ease-out",
            }}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <p className={`text-4xl font-extrabold ${tailwindColor}`}>{score}%</p>
          <p className={`text-sm font-medium ${tailwindColor} mt-1`}>
            {isImproving ? "Improving" : "Needs Focus"}
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-400">Based on last 30 days.</p>
    </div>
  );
};

const ChatbotWindow: React.FC = () => {
  return (
    <div className="p-6 rounded-xl shadow-xl bg-gray-800 h-full flex flex-col border border-blue-700">
      <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center space-x-2">
        <Bot className="w-5 h-5" />
        <span>LightStars AI Assistant</span>
      </h3>
      <div className="grow overflow-y-auto space-y-3 mb-4 text-sm">
        <div className="flex justify-start">
          <p className="bg-gray-700 p-3 rounded-lg max-w-xs">
            Hello Aisha! How can I assist with your data architecture or
            operational tasks today?
          </p>
        </div>
        <div className="flex justify-end">
          <p className="bg-blue-600 p-3 rounded-lg max-w-xs">
            I need a summary of server S01's utilization data.
          </p>
        </div>
        <div className="flex justify-start">
          <p className="bg-gray-700 p-3 rounded-lg max-w-xs">
            Acknowledged. Checking real-time metrics now...
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Ask the AI a question..."
          className="grow bg-gray-700 text-gray-100 p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
        <button className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          <Zap className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

interface NotificationsDropdownProps {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  notifications,
  onClose,
}) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-xl shadow-2xl z-20 border border-gray-700 max-h-96 overflow-y-auto">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">
          Notifications ({notifications.length})
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition"
        >
          &times;
        </button>
      </div>
      {notifications.length === 0 ? (
        <p className="p-4 text-gray-400 text-sm">No new alerts or messages.</p>
      ) : (
        <ul className="divide-y divide-gray-700">
          {notifications.map((n) => {
            const Icon = n.type === "alert" ? AlertTriangle : CheckCircle;
            const color =
              n.type === "alert" ? "text-red-400" : "text-green-400";
            const bgColor =
              n.type === "alert"
                ? "hover:bg-red-900/30"
                : "hover:bg-green-900/30";

            return (
              <li
                key={n.id}
                className={`p-4 flex items-start space-x-3 transition ${bgColor} cursor-pointer`}
              >
                <Icon className={`w-5 h-5 shrink-0 mt-1 ${color}`} />
                <div className="grow">
                  <p className="text-sm text-gray-200">{n.message}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default function App() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedNav, setSelectedNav] = useState<string>(navItems[0].id);
  const [footerMessage, setFooterMessage] = useState<string>(footerMessages[0]);
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const bellRef = useRef<HTMLDivElement>(null);

  const currentInitials = getInitials(profile.firstName, profile.lastName);
  const dynamicPlaceholderUrl = `https://placehold.co/150x150/4f46e5/ffffff?text=${currentInitials}`;

  const profileImageSrc = profile.profileImageUrl.startsWith("data:image")
    ? profile.profileImageUrl
    : dynamicPlaceholderUrl;

  useEffect(() => {
    const interval = setInterval(() => {
      setFooterMessage((prevMessage) => {
        const currentIndex = footerMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % footerMessages.length;
        return footerMessages[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleProfileUpdate = (key: string, newValue: string) => {
    let formattedKey = key.replace(/\s(.)/g, (_, char) => char.toUpperCase());
    formattedKey = formattedKey.charAt(0).toLowerCase() + formattedKey.slice(1);

    const profileKey = formattedKey as keyof Profile;

    if (profileKey in initialProfile && profile[profileKey] !== newValue) {
      setProfile((prev) => ({
        ...prev,
        [profileKey]: newValue,
      }));
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfile((prev) => ({
            ...prev,
            profileImageUrl: e.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeModal = () => {
    const modal = document.getElementById("logout-modal");
    if (modal) modal.style.display = "none";
  };

  const confirmLogout = () => {
    closeModal();
    console.log("Successfully logged out (Simulated).");
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const contentWindowSpan = isChatOpen ? "lg:col-span-1" : "lg:col-span-2";

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans overflow-hidden">
      <aside className="w-full sm:w-80 shrink-0 bg-gray-800 border-r border-gray-700 p-6 flex flex-col overflow-y-auto">
        <div className="mb-8 flex items-center space-x-3 border-b border-gray-700 pb-4">
          <Star className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-extrabold tracking-widest uppercase text-white">
            Light<span className="text-blue-400">Stars</span>
          </h2>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={profileImageSrc}
              alt="User Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover shadow-lg"
              onError={(e) => (e.currentTarget.src = dynamicPlaceholderUrl)}
            />
            {isEditing && (
              <>
                <input
                  type="file"
                  id="profile-image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="profile-image-upload"
                  className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition duration-150 border-2 border-gray-800"
                  title="Change Profile Picture"
                >
                  <ImageIcon className="w-4 h-4 text-white" />
                </label>
              </>
            )}
          </div>

          <h1 className="text-2xl font-bold mt-3">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-sm text-gray-400">{profile.role}</p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center justify-center space-x-2 py-2 px-4 text-sm font-semibold rounded-full transition duration-200 mb-6 ${
            isEditing
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } cursor-pointer shadow-md w-full`}
        >
          <PenLine className="w-4 h-4" />
          <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
        </button>

        <div className="space-y-4 grow">
          <ProfileField
            icon={Briefcase}
            label="Company Name"
            value={profile.companyName}
            isEditable={false}
          />
          <ProfileField
            icon={User}
            label="First Name"
            value={profile.firstName}
            isEditable={isEditing}
            onUpdate={handleProfileUpdate}
          />
          <ProfileField
            icon={User}
            label="Last Name"
            value={profile.lastName}
            isEditable={isEditing}
            onUpdate={handleProfileUpdate}
          />
          <ProfileField
            icon={Users}
            label="Gender"
            value={profile.gender}
            isEditable={isEditing}
            onUpdate={handleProfileUpdate}
          />
          <ProfileField
            icon={Mail}
            label="Email"
            value={profile.email}
            isEditable={isEditing}
            onUpdate={handleProfileUpdate}
          />
          <ProfileField
            icon={Phone}
            label="Phone Number"
            value={profile.phone}
            isEditable={isEditing}
            onUpdate={handleProfileUpdate}
          />
          <ProfileField
            icon={Briefcase}
            label="Department"
            value={profile.department}
            isEditable={isEditing}
            onUpdate={handleProfileUpdate}
          />
          <ProfileField
            icon={Hash}
            label="Employee Number"
            value={profile.employeeNumber}
            isEditable={isEditing}
            onUpdate={handleProfileUpdate}
          />
          <ProfileField
            icon={Briefcase}
            label="Role/Occupation"
            value={profile.role}
            isEditable={isEditing}
            onUpdate={handleProfileUpdate}
          />
        </div>

        <div className="mt-8 pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-700 text-red-400 font-semibold rounded-lg hover:bg-gray-600 transition duration-200 shadow-md"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="grow flex flex-col p-6 sm:p-10 overflow-hidden">
        <header className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3 relative shrink-0">
          <div className="w-10 h-10"></div>

          <h1 className="text-4xl font-bold text-white absolute left-1/2 transform -translate-x-1/2">
            {navItems.find((item) => item.id === selectedNav)?.label}
          </h1>

          <div className="relative shrink-0" ref={bellRef}>
            <button
              onClick={toggleNotifications}
              className="p-3 rounded-full bg-gray-800 text-yellow-400 hover:bg-gray-700 transition duration-150 relative"
              aria-expanded={isNotificationsOpen}
            >
              <Bell className="w-6 h-6" />
              {mockNotifications.length > 0 && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900"></span>
              )}
            </button>

            {isNotificationsOpen && (
              <NotificationsDropdown
                notifications={mockNotifications}
                onClose={() => setIsNotificationsOpen(false)}
              />
            )}
          </div>
        </header>

        <nav className="flex justify-center space-x-4 mb-8 overflow-x-auto pb-2 shrink-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedNav(item.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition duration-200 shrink-0 ${
                selectedNav === item.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="grow min-h-0">
          <div
            className={`grid grid-cols-1 ${
              isChatOpen ? "lg:grid-cols-3" : "lg:grid-cols-3"
            } gap-6 mb-6`}
          >
            <div className="lg:col-span-1 h-110 flex flex-col">
              <PerformanceTracker score={PERFORMANCE_SCORE} />
            </div>

            <div
              className={`${contentWindowSpan} h-110 flex flex-col overflow-y-auto`}
            >
              <ContentWindow selectedItem={selectedNav} />
            </div>

            {isChatOpen && (
              <div className="lg:col-span-1 h-full flex flex-col overflow-y-auto">
                <ChatbotWindow />
              </div>
            )}
          </div>

          <footer className="mt-auto pt-4 text-center text-sm text-gray-500 border-t border-gray-800">
            <p className="italic font-medium">{footerMessage}</p>
          </footer>
        </div>

        <div className="flex justify-end fixed bottom-6 right-6 z-40">
          <button
            onClick={toggleChat}
            className={`flex items-center space-x-2 px-6 py-3 font-bold rounded-full shadow-2xl transition duration-300 transform hover:scale-105 ${
              isChatOpen
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Bot className="w-6 h-6" />
            <span>{isChatOpen ? "Close Assistant" : "AI Assistant"}</span>
          </button>
        </div>
      </main>

      <div
        id="logout-modal"
        className="fixed inset-0 bg-black bg-opacity-70 hidden items-center justify-center z-50"
      >
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl max-w-sm w-full border border-gray-700">
          <h3 className="text-xl font-bold text-red-400 mb-4">
            Confirm Logout
          </h3>
          <p className="text-gray-300 mb-6">
            Are you sure you want to log out of LightStars?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
