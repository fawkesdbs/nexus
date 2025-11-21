import React, { useState, useEffect, useRef } from "react";
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
  Loader2, // Added for loading states
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
import { useAuth } from "../../contexts/AuthContext";

// --- Types for Chat ---
interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

// --- Static Data (Kept for parts not yet supported by API) ---
const moods: Mood[] = [
  { emoji: "😊", label: "happy" },
  { emoji: "😐", label: "neutral" },
  { emoji: "😔", label: "sad" },
  { emoji: "😴", label: "tired" },
  { emoji: "😰", label: "stressed" },
];

const quickActions = [
  { icon: Plus, label: "Add New Task" },
  { icon: Calendar, label: "Schedule Meeting" },
  { icon: BarChart3, label: "View Performance" },
  { icon: BookOpen, label: "Learning Resources" },
];

// --- Main Dashboard Component ---
const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // --- Data States ---
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [lastMeeting, setLastMeeting] = useState<Meeting | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [teamCount, setTeamCount] = useState<number>(0);

  // --- UI States ---
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [activeEventFilter, setActiveEventFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when history changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // --- API Integration ---
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const headers = { Authorization: `Bearer ${token}` };

      try {
        setLoading(true);

        // 1. Fetch Tasks
        const tasksRes = await fetch("/api/tasks", { headers });
        if (tasksRes.ok) setTasks(await tasksRes.json());

        // 2. Fetch Notifications
        const notifRes = await fetch("/api/notifications", { headers });
        if (notifRes.ok) {
          const notifData = await notifRes.json();
          setNotifications(notifData);
          if (notifData.some((n: Notification) => !n.is_read)) {
            setHasNewNotifications(true);
          }
        }

        // 3. Fetch Meetings
        const meetingRes = await fetch("/api/meetings", { headers });
        if (meetingRes.ok) {
          const meetingsData = await meetingRes.json();
          if (meetingsData.length > 0) {
            const recent = meetingsData[0];
            setLastMeeting({
              title: recent.meeting_title,
              time: new Date(recent.created_at).toLocaleDateString(),
              preparation: `Key Decisions: ${
                recent.key_decisions || "None logged"
              }`,
            });
          }
        }

        // 4. Fetch Events (Internal)
        const eventsRes = await fetch("/api/events", { headers });
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          // Ensure dates are formatted for display
          const formattedEvents = eventsData.map((e: Event) => ({
            ...e,
            date: new Date(e.date).toLocaleDateString(),
          }));
          setEvents(formattedEvents);
        }

        // 5. Fetch Team Stats
        const teamRes = await fetch("/api/team/stats", { headers });
        if (teamRes.ok) {
          const teamData = await teamRes.json();
          setTeamCount(teamData.count);
        }
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Event Handlers ---

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const token = localStorage.getItem("token");
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: chatMessage,
      timestamp: new Date(),
    };

    // Optimistic update
    setChatHistory((prev) => [...prev, userMsg]);
    setChatMessage("");
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMsg.text }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: data.reply,
        timestamp: new Date(),
      };

      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      // Add error message to chat
      setChatHistory((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "assistant",
          text: "Sorry, I'm having trouble connecting to the server right now.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleNotificationClick = () => {
    setHasNewNotifications(false);
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

  const pendingTasksCount = tasks.length;

  const summaryData: SummaryItem[] = [
    {
      id: "1",
      category: "Total Tasks",
      count: tasks.length,
      change: +2,
      icon: CheckCircle2,
      color: "text-green-400",
    },
    {
      id: "2",
      category: "Pending",
      count: pendingTasksCount,
      change: -1,
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      id: "3",
      category: "Team Members",
      count: teamCount,
      change: +0,
      icon: Users,
      color: "text-blue-400",
    },
    {
      id: "4",
      category: "Upcoming Events",
      count: events.length,
      change: +1,
      icon: Calendar,
      color: "text-purple-400",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

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
                    High Priority Focus
                  </h3>
                  {tasks.length > 0 ? (
                    tasks
                      .filter(
                        (t) => t.priority === "high" || t.priority === "at-risk"
                      )
                      .slice(0, 3)
                      .map((task) => <TaskCard key={task.id} task={task} />)
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No high priority tasks.
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-md font-semibold text-gray-300 mb-3">
                    Other Tasks
                  </h3>
                  {tasks.length > 0 ? (
                    tasks
                      .filter(
                        (task) =>
                          task.priority !== "high" &&
                          task.priority !== "at-risk"
                      )
                      .slice(0, 3)
                      .map((task) => <TaskCard key={task.id} task={task} />)
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No other tasks pending.
                    </p>
                  )}
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
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm col-span-2">
                    No upcoming events found.
                  </p>
                )}
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
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No new notifications</p>
                )}
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
                  <h4 className="font-bold text-white">Client Presentation</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Tomorrow, 10:00 AM
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Prepare: Project updates
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-300 mb-2">
                  Last Meeting
                </h3>
                {lastMeeting ? (
                  <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white">
                      {lastMeeting.title}
                    </h4>
                    <p className="text-sm text-gray-300 mt-1">
                      {lastMeeting.time}
                    </p>
                    <div className="mt-2">
                      <p className="text-xs text-gray-400">
                        {lastMeeting.preparation}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No meeting summaries found.
                  </p>
                )}
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
            <div className="flex-1 bg-gray-700 rounded-lg p-4 md:mr-4 mb-4 md:mb-0 flex flex-col h-96">
              {/* Chat History */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                {chatHistory.length === 0 ? (
                  <div className="flex items-start">
                    <div className="bg-blue-600 p-2 rounded-lg mr-3 shrink-0">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-600 p-3 rounded-lg shadow-sm max-w-md">
                      <p className="text-sm text-white">
                        Hello {user?.first_name}! I'm your AI Task Coach. How
                        can I help you today?
                      </p>
                    </div>
                  </div>
                ) : (
                  chatHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-600 text-white rounded-tl-none"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))
                )}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-600 p-3 rounded-lg rounded-tl-none shadow-sm">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-300" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex mt-auto">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 py-2 px-4 rounded-l-lg bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isChatLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isChatLoading || !chatMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-r-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
