import React, { useState } from "react";
import {
  Brain,
  Bell,
  Calendar,
  MessageSquare,
  Plus,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Users,
  Send,
  Filter,
  TrendingUp,
  Download,
} from "lucide-react";
import type {
  Task,
  Meeting,
  Notification,
  Mood,
  Event,
  SummaryItem,
} from "../../types/dashboard";
import { TaskCard } from "../../components/Dashboard/TaskCard";
import { NotificationItem } from "../../components/Dashboard/NotificationItem";
import { EventCard } from "../../components/Dashboard/EventCard";
import { SummaryCard } from "../../components/Dashboard/SummaryCard";

// --- Static Data ---
const tasks: Task[] = [
  {
    id: "1",
    title: "Client Report",
    due: "Due in 2 days",
    description: "High impact on team KPIs",
    priority: "high",
  },
  {
    id: "2",
    title: "Project Planning",
    due: "Due in 4 days",
    description: "Requires team coordination",
    priority: "medium",
  },
  {
    id: "3",
    title: "Email Campaign",
    due: "Due in 5 days",
    description: "Marketing initiative",
    priority: "low",
  },
  {
    id: "4",
    title: "Budget Review",
    due: "Due tomorrow",
    description: "Requires immediate attention",
    priority: "at-risk",
  },
];

// Applied Meeting type to fix unused variable lint error
const meetings: { upcoming: Meeting; last: Meeting } = {
  upcoming: {
    title: "Client Presentation",
    time: "Tomorrow, 10:00 AM",
    preparation: "Prepare: Project updates, budget overview",
  },
  last: {
    title: "Team Standup",
    time: "Yesterday, 9:30 AM",
    preparation: "Key Decisions: Move deadline to Friday, Assign QA to Sarah",
  },
};

const notifications: Notification[] = [
  {
    id: "1",
    title: "Budget Review Due Tomorrow",
    message: "Start working on this task today",
    type: "alert",
  },
  {
    id: "2",
    title: "Client Presentation Tomorrow",
    message: "Prepare project updates and budget overview",
    type: "info",
  },
  {
    id: "3",
    title: "Weekly Progress Update",
    message: "You completed 5 tasks this week. Great job!",
    type: "success",
  },
];

const moods: Mood[] = [
  { emoji: "😊", label: "happy" },
  { emoji: "😐", label: "neutral" },
  { emoji: "😔", label: "sad" },
  { emoji: "😴", label: "tired" },
  { emoji: "😰", label: "stressed" },
];

const events: Event[] = [
  {
    id: "1",
    name: "Quarterly Planning Session",
    venue: "Conference Room A",
    date: "2024-01-20",
    time: "09:00 AM - 11:00 AM",
    type: "meeting",
    attendees: 12,
    status: "upcoming",
  },
  {
    id: "2",
    name: "Cloud Architecture Workshop",
    venue: "Training Center",
    date: "2024-01-22",
    time: "02:00 PM - 04:00 PM",
    type: "training",
    attendees: 25,
    status: "upcoming",
  },
  {
    id: "3",
    name: "Project Alpha Deadline",
    venue: "Remote",
    date: "2024-01-25",
    time: "05:00 PM",
    type: "deadline",
    attendees: 8,
    status: "upcoming",
  },
  {
    id: "4",
    name: "Team Building Lunch",
    venue: "The Bistro Downtown",
    date: "2024-01-18",
    time: "12:30 PM - 02:00 PM",
    type: "social",
    attendees: 15,
    status: "ongoing",
  },
];

const summaryData: SummaryItem[] = [
  {
    id: "1",
    category: "Completed Tasks",
    count: 15,
    change: +12,
    icon: CheckCircle2,
    color: "text-green-400",
  },
  {
    id: "2",
    category: "Pending Tasks",
    count: 8,
    change: -3,
    icon: Clock,
    color: "text-yellow-400",
  },
  {
    id: "3",
    category: "Team Members",
    count: 24,
    change: +2,
    icon: Users,
    color: "text-blue-400",
  },
  {
    id: "4",
    category: "Upcoming Events",
    count: 6,
    change: +1,
    icon: Calendar,
    color: "text-purple-400",
  },
];

const quickActions = [
  { icon: Plus, label: "Add New Task" },
  { icon: Calendar, label: "Schedule Meeting" },
  { icon: BarChart3, label: "View Performance" },
  { icon: BookOpen, label: "Learning Resources" },
];

// --- Main Dashboard Component ---
const Dashboard: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [activeEventFilter, setActiveEventFilter] = useState("all");

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    console.log(`Mood selected: ${mood}`);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log(`Message sent: ${chatMessage}`);
      setChatMessage("");
    }
  };

  const handleNotificationClick = () => {
    setHasNewNotifications(false);
    console.log("Notifications clicked");
  };

  const filteredEvents = events.filter(
    (event) => activeEventFilter === "all" || event.type === activeEventFilter
  );

  const eventFilters = [
    { key: "all", label: "All Events" },
    { key: "meeting", label: "Meetings" },
    { key: "training", label: "Training" },
    { key: "deadline", label: "Deadlines" },
    { key: "social", label: "Social" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white">AI Task Coach</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Bell className="w-6 h-6" />
                {hasNewNotifications && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {summaryData.map((item) => (
            <SummaryCard key={item.id} item={item} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Task Management & Events */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Management */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <CheckCircle2 className="w-5 h-5 text-blue-400 mr-2" />
                AI Task Prioritizer
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-md font-semibold text-gray-300 mb-3">
                    Top 3 Tasks to Focus On
                  </h3>
                  {tasks.slice(0, 3).map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>

                <div>
                  <h3 className="text-md font-semibold text-gray-300 mb-3">
                    At-Risk Tasks
                  </h3>
                  {tasks
                    .filter((task) => task.priority === "at-risk")
                    .map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                </div>
              </div>
            </div>

            {/* Events Calendar */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center">
                  <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                  Upcoming Events
                </h2>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={activeEventFilter}
                    onChange={(e) => setActiveEventFilter(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {eventFilters.map((filter) => (
                      <option key={filter.key} value={filter.key}>
                        {filter.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            {/* Summary Table */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center">
                  <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                  Performance Summary
                </h2>
                <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                        Metric
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                        Current
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                        Previous
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                        Change
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                      <td className="py-3 px-4 text-sm text-white">
                        Task Completion Rate
                      </td>
                      <td className="py-3 px-4 text-sm text-white">85%</td>
                      <td className="py-3 px-4 text-sm text-gray-400">78%</td>
                      <td className="py-3 px-4 text-sm text-green-400">+7%</td>
                      <td className="py-3 px-4 text-sm text-green-400">
                        ↑ Improving
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                      <td className="py-3 px-4 text-sm text-white">
                        On-time Delivery
                      </td>
                      <td className="py-3 px-4 text-sm text-white">92%</td>
                      <td className="py-3 px-4 text-sm text-gray-400">88%</td>
                      <td className="py-3 px-4 text-sm text-green-400">+4%</td>
                      <td className="py-3 px-4 text-sm text-green-400">
                        ↑ Improving
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                      <td className="py-3 px-4 text-sm text-white">
                        Team Collaboration
                      </td>
                      <td className="py-3 px-4 text-sm text-white">78%</td>
                      <td className="py-3 px-4 text-sm text-gray-400">82%</td>
                      <td className="py-3 px-4 text-sm text-red-400">-4%</td>
                      <td className="py-3 px-4 text-sm text-red-400">
                        ↓ Needs Attention
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-700/30 transition-colors">
                      <td className="py-3 px-4 text-sm text-white">
                        Learning Progress
                      </td>
                      <td className="py-3 px-4 text-sm text-white">65%</td>
                      <td className="py-3 px-4 text-sm text-gray-400">45%</td>
                      <td className="py-3 px-4 text-sm text-green-400">+20%</td>
                      <td className="py-3 px-4 text-sm text-green-400">
                        ↑ Excellent
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Mood & Productivity */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
                Mood & Productivity
              </h2>

              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-300 mb-2">
                  How are you feeling today?
                </h3>
                <div className="flex justify-between">
                  {moods.map((mood, index) => (
                    <button
                      key={index}
                      onClick={() => handleMoodSelect(mood.label)}
                      className={`text-2xl transition-all duration-200 hover:scale-125 ${
                        selectedMood === mood.label
                          ? "scale-125 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]"
                          : ""
                      }`}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-300 mb-2">
                  Productivity Insights
                </h3>
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                  <p className="text-sm text-gray-300 mb-2">
                    You tend to complete tasks faster in the morning.
                  </p>
                  <p className="text-sm font-medium text-white">
                    Consider scheduling important work between 9am–11am.
                  </p>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <Bell className="w-5 h-5 text-blue-400 mr-2" />
                Smart Notifications
              </h2>

              <div className="space-y-3">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </div>
            </div>

            {/* Meeting Summary */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                Meeting Summary
              </h2>

              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-300 mb-2">
                  Upcoming Meeting
                </h3>
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                  <h4 className="font-bold text-white">
                    {meetings.upcoming.title}
                  </h4>
                  <p className="text-sm text-gray-300 mt-1">
                    {meetings.upcoming.time}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {meetings.upcoming.preparation}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-300 mb-2">
                  Last Meeting
                </h3>
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-bold text-white">
                    {meetings.last.title}
                  </h4>
                  <p className="text-sm text-gray-300 mt-1">
                    {meetings.last.time}
                  </p>
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-gray-300">
                      Key Decisions:
                    </p>
                    <ul className="text-xs text-gray-400 list-disc pl-5 mt-1">
                      <li>Move deadline to Friday</li>
                      <li>Assign QA to Sarah</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Section - AI Assistant */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <Brain className="w-5 h-5 text-blue-400 mr-2" />
            AI Assistant
          </h2>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 bg-gray-700 rounded-lg p-4 md:mr-4 mb-4 md:mb-0">
              <div className="flex items-start mb-4">
                <div className="bg-blue-600 p-2 rounded-lg mr-3">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-600 p-3 rounded-lg shadow-sm max-w-md">
                  <p className="text-sm text-white">
                    Hello! I'm your AI Task Coach. How can I help you today?
                  </p>
                </div>
              </div>

              <div className="flex">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 py-2 px-4 rounded-l-lg bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-r-lg transition duration-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-full md:w-64">
              <h3 className="font-medium text-gray-300 mb-2">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="w-full text-left bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-3 rounded-lg text-sm transition duration-300 flex items-center"
                  >
                    <action.icon className="w-4 h-4 text-blue-400 mr-2" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 hover:scale-110">
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
