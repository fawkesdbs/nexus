import React, { useState } from 'react';
import { 
    Brain, Bell, Search, User, Calendar, 
    MessageSquare, Plus, BarChart3, BookOpen,
    Star, Lightbulb, ThumbsUp, TrendingUp,
    CheckCircle2, Clock, Users, Send,
    AlertCircle, Check, CalendarDays, X, Clock4, School
} from 'lucide-react';

// --- Type Definitions ---
interface Task {
    id: string;
    title: string;
    due: string;
    description: string;
    priority: 'high' | 'medium' | 'low' | 'at-risk';
}

interface Meeting {
    title: string;
    time: string;
    preparation: string;
}

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'alert' | 'info' | 'success';
}

interface Mood {
    emoji: string;
    label: string;
}

interface NewTaskForm {
    title: string;
    summary: string;
    teamMembers: string;
    deadline: string;
}

// Added type for new meeting form state
interface NewMeetingForm {
    title: string;
    date: string;
    time: string;
    attendees: string;
}

// --- Static Data ---
const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Client Report',
        due: 'Due in 2 days',
        description: 'High impact on team KPIs',
        priority: 'high'
    },
    {
        id: '2',
        title: 'Project Planning',
        due: 'Due in 4 days',
        description: 'Requires team coordination',
        priority: 'medium'
    },
    {
        id: '3',
        title: 'Email Campaign',
        due: 'Due in 5 days',
        description: 'Marketing initiative',
        priority: 'low'
    },
    {
        id: '4',
        title: 'Budget Review',
        due: 'Due tomorrow',
        description: 'Requires immediate attention',
        priority: 'at-risk'
    }
];

const meetingsData = { // Renamed to avoid collision with methods
    upcoming: {
        title: 'Client Presentation',
        time: 'Tomorrow, 10:00 AM',
        preparation: 'Prepare: Project updates, budget overview'
    },
    last: {
        title: 'Team Standup',
        time: 'Yesterday, 9:30 AM',
        preparation: 'Key Decisions: Move deadline to Friday, Assign QA to Sarah'
    }
};

const notifications: Notification[] = [
    {
        id: '1',
        title: 'Budget Review Due Tomorrow',
        message: 'Start working on this task today',
        type: 'alert'
    },
    {
        id: '2',
        title: 'Client Presentation Tomorrow',
        message: 'Prepare project updates and budget overview',
        type: 'info'
    },
    {
        id: '3',
        title: 'Weekly Progress Update',
        message: 'You completed 5 tasks this week. Great job!',
        type: 'success'
    }
];

const moods: Mood[] = [
    { emoji: '😊', label: 'happy' },
    { emoji: '😐', label: 'neutral' },
    { emoji: '😔', label: 'sad' },
    { emoji: '😴', label: 'tired' },
    { emoji: '😰', label: 'stressed' }
];

const quickActions = [
    { icon: Plus, label: 'Add New Task' },
    { icon: Calendar, label: 'Schedule Meeting' },
    { icon: BarChart3, label: 'View Performance' },
    { icon: BookOpen, label: 'Learning Resources' }
];

// Reusable components (TaskCard, NotificationItem) remain the same...

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    // ... (TaskCard implementation remains the same)
    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case 'high':
                return { container: 'bg-red-900/30 border-red-500', badge: 'bg-red-500 text-white' };
            case 'medium':
                return { container: 'bg-yellow-900/30 border-yellow-500', badge: 'bg-yellow-500 text-white' };
            case 'low':
                return { container: 'bg-green-900/30 border-green-500', badge: 'bg-green-500 text-white' };
            case 'at-risk':
                return { container: 'bg-orange-900/30 border-orange-500', badge: 'bg-orange-500 text-white' };
            default:
                return { container: 'bg-gray-700 border-gray-500', badge: 'bg-gray-500 text-white' };
        }
    };

    const styles = getPriorityStyles(task.priority);

    return (
        <div className={`task-card border-l-4 p-4 mb-3 rounded-r-lg ${styles.container}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-white">{task.title}</h4>
                    <p className="text-sm text-gray-300 mt-1">{task.due}</p>
                    <p className="text-xs text-gray-400 mt-2">{task.description}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${styles.badge}`}>
                    {task.priority === 'at-risk' ? 'At Risk' : task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
            </div>
        </div>
    );
};

interface NotificationItemProps {
    notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
    const getIcon = () => {
        switch (notification.type) {
            case 'alert':
                return <div className="bg-red-500 p-2 rounded-lg"><AlertCircle className="w-4 h-4 text-white" /></div>;
            case 'info':
                return <div className="bg-blue-500 p-2 rounded-lg"><CalendarDays className="w-4 h-4 text-white" /></div>;
            case 'success':
                return <div className="bg-green-500 p-2 rounded-lg"><Check className="w-4 h-4 text-white" /></div>;
            default:
                return <div className="bg-gray-500 p-2 rounded-lg"><Bell className="w-4 h-4 text-white" /></div>;
        }
    };

    return (
        <div className="flex items-start space-x-3">
            {getIcon()}
            <div>
                <h4 className="font-medium text-white">{notification.title}</h4>
                <p className="text-xs text-gray-400">{notification.message}</p>
            </div>
        </div>
    );
};

// --- Main Dashboard Component ---
const Dashboard: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [chatMessage, setChatMessage] = useState('');
    const [hasNewNotifications, setHasNewNotifications] = useState(true);
    const [currentTasks, setCurrentTasks] = useState<Task[]>(initialTasks);
    
    // Expanded viewMode state
    const [viewMode, setViewMode] = useState<'list' | 'add' | 'schedule' | 'performance' | 'learning'>('list'); 
    
    const initialNewTaskState: NewTaskForm = { title: '', summary: '', teamMembers: '', deadline: '' };
    const [newTask, setNewTask] = useState<NewTaskForm>(initialNewTaskState);

    const initialNewMeetingState: NewMeetingForm = { title: '', date: '', time: '', attendees: '' };
    const [newMeeting, setNewMeeting] = useState<NewMeetingForm>(initialNewMeetingState);

    // --- Handlers ---
    
    const handleMoodSelect = (mood: string) => {
        setSelectedMood(mood);
        console.log(`Mood selected: ${mood}`);
    };

    const handleSendMessage = () => {
        if (chatMessage.trim()) {
            console.log(`Message sent: ${chatMessage}`);
            setChatMessage('');
        }
    };

    const handleNotificationClick = () => {
        setHasNewNotifications(false);
        console.log('Notifications clicked');
    };

    const handleQuickActionClick = (label: string) => {
        switch (label) {
            case 'Add New Task':
                setViewMode('add');
                break;
            case 'Schedule Meeting':
                setViewMode('schedule');
                break;
            case 'View Performance':
                setViewMode('performance');
                break;
            case 'Learning Resources':
                setViewMode('learning');
                break;
            default:
                setViewMode('list');
        }
    };

    // New Task Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleAddNewTask = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newTask.title || !newTask.summary || !newTask.deadline) {
            alert('Please fill in required fields.');
            return;
        }

        const newTaskId = (currentTasks.length + 1).toString();
        const newTaskObject: Task = {
            id: newTaskId,
            title: newTask.title,
            due: `Due on ${new Date(newTask.deadline).toLocaleDateString()}`,
            description: newTask.summary,
            priority: 'medium' 
        };

        setCurrentTasks([newTaskObject, ...currentTasks]);
        setNewTask(initialNewTaskState);
        setViewMode('list'); 
        alert(`Task "${newTask.title}" added successfully!`);
    };

    // New Meeting Handlers
    const handleMeetingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewMeeting({ ...newMeeting, [e.target.name]: e.target.value });
    };

    const handleScheduleMeeting = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newMeeting.title || !newMeeting.date || !newMeeting.time) {
            alert('Please fill in required fields.');
            return;
        }

        console.log('Scheduled Meeting:', newMeeting);
        setNewMeeting(initialNewMeetingState);
        setViewMode('list');
        alert(`Meeting "${newMeeting.title}" scheduled successfully!`);
    };

    // --- Render Functions for Quick Actions ---
    
    const renderAddTaskForm = () => (
        <div className="flex flex-col bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 min-h-[70vh]">
            <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
                <Plus className="w-6 h-6 mr-3" /> Add New Task
            </h3>
            <form onSubmit={handleAddNewTask} className="flex-grow space-y-5 overflow-y-auto pr-2">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Task Title *</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={newTask.title}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-300 mb-1">Task Summary *</label>
                    <textarea
                        name="summary"
                        id="summary"
                        rows={3}
                        value={newTask.summary}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-300 mb-1">Team Members (Optional, e.g., John, Jane)</label>
                    <input
                        type="text"
                        name="teamMembers"
                        id="teamMembers"
                        value={newTask.teamMembers}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-1">Deadline *</label>
                    <input
                        type="date"
                        name="deadline"
                        id="deadline"
                        value={newTask.deadline}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="pt-4 space-y-3">
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center space-x-2 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        <span>ADD TASK</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode('list')}
                        className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition border border-gray-600"
                    >
                        <X className="w-5 h-5" />
                        <span>Cancel</span>
                    </button>
                </div>
            </form>
        </div>
    );

    const renderScheduleMeetingForm = () => (
        <div className="flex flex-col bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 min-h-[70vh]">
            <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3" /> Schedule New Meeting
            </h3>
            <form onSubmit={handleScheduleMeeting} className="flex-grow space-y-5 overflow-y-auto pr-2">
                <div>
                    <label htmlFor="meetingTitle" className="block text-sm font-medium text-gray-300 mb-1">Meeting Title *</label>
                    <input
                        type="text"
                        name="title"
                        id="meetingTitle"
                        value={newMeeting.title}
                        onChange={handleMeetingInputChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date *</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={newMeeting.date}
                            onChange={handleMeetingInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">Time *</label>
                        <input
                            type="time"
                            name="time"
                            id="time"
                            value={newMeeting.time}
                            onChange={handleMeetingInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="attendees" className="block text-sm font-medium text-gray-300 mb-1">Attendees (Emails or Names)</label>
                    <input
                        type="text"
                        name="attendees"
                        id="attendees"
                        value={newMeeting.attendees}
                        onChange={handleMeetingInputChange}
                        placeholder="e.g., jane@comp.com, marketing team"
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                
                <div className="pt-4 space-y-3">
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
                    >
                        <CalendarDays className="w-5 h-5" />
                        <span>SCHEDULE MEETING</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode('list')}
                        className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition border border-gray-600"
                    >
                        <X className="w-5 h-5" />
                        <span>Cancel</span>
                    </button>
                </div>
            </form>
        </div>
    );

    const renderPerformanceView = () => (
        <div className="flex flex-col bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 min-h-[70vh]">
            <h3 className="text-2xl font-bold text-blue-400 mb-8 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3" /> Detailed Performance Metrics
            </h3>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg shadow border border-gray-600">
                        <p className="text-sm text-gray-400">Completion Rate</p>
                        <p className="text-3xl font-bold text-green-400 flex items-center mt-1">
                            85% <TrendingUp className="w-5 h-5 ml-2" />
                        </p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg shadow border border-gray-600">
                        <p className="text-sm text-gray-400">Average Priority</p>
                        <p className="text-3xl font-bold text-yellow-400 mt-1">Medium</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg shadow border border-gray-600">
                        <p className="text-sm text-gray-400">Time Saved (AI Prep)</p>
                        <p className="text-3xl font-bold text-blue-400 flex items-center mt-1">
                            4 hrs <Clock4 className="w-5 h-5 ml-2" />
                        </p>
                    </div>
                </div>
                
                <div className="bg-blue-900/30 p-5 rounded-lg border border-blue-700">
                    <h4 className="font-semibold text-white mb-3 flex items-center">
                        <Lightbulb className="w-5 h-5 mr-2 text-blue-300" /> AI Growth Recommendation
                    </h4>
                    <p className="text-gray-300 text-sm">
                        Your performance dipped slightly during late afternoons (3 PM - 5 PM). 
                        Consider blocking this time for low-cognitive tasks like email sorting or brief learning modules 
                        to maintain energy.
                    </p>
                </div>

                <div className="pt-4">
                    <button
                        onClick={() => setViewMode('list')}
                        className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition border border-gray-600"
                    >
                        <X className="w-5 h-5" />
                        <span>Back to Dashboard</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const renderLearningResources = () => (
        <div className="flex flex-col bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 min-h-[70vh]">
            <h3 className="text-2xl font-bold text-blue-400 mb-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-3" /> Personalized Learning Hub
            </h3>
            <div className="space-y-4">
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                        <School className="w-5 h-5 mr-2 text-green-300" /> Recommended: Time Management
                    </h4>
                    <p className="text-gray-300 text-sm">
                        Based on task tracking, a module on **Advanced Prioritization Techniques** has been suggested. Estimated completion time: 30 minutes.
                    </p>
                    <button className="mt-3 text-sm font-medium text-green-400 hover:text-green-300">
                        Start Module →
                    </button>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">Documentation: Project X</h4>
                    <p className="text-gray-400 text-sm">
                        Review the latest changes to the Project X technical documentation.
                    </p>
                    <button className="mt-3 text-sm font-medium text-blue-400 hover:text-blue-300">
                        View Docs →
                    </button>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">Suggested Reading</h4>
                    <p className="text-gray-400 text-sm">
                        Article: "Effective Client Communication Strategies for Complex Deliverables."
                    </p>
                    <button className="mt-3 text-sm font-medium text-blue-400 hover:text-blue-300">
                        Read Article →
                    </button>
                </div>
            </div>

            <div className="pt-8 mt-auto">
                <button
                    onClick={() => setViewMode('list')}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition border border-gray-600"
                >
                    <X className="w-5 h-5" />
                    <span>Back to Dashboard</span>
                </button>
            </div>
        </div>
    );
    
    // Main Dashboard List Content
    const renderDashboardList = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Task Management */}
            <div className="md:col-span-1">
                <div className="bg-gray-800 rounded-xl shadow-lg p-5 mb-6 border border-gray-700">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mr-2" />
                        AI Task Prioritizer
                    </h2>
                    
                    <div className="mb-6">
                        <h3 className="text-md font-semibold text-gray-300 mb-3">Top 3 Tasks to Focus On</h3>
                        {currentTasks.filter(task => task.priority !== 'at-risk').slice(0, 3).map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                    
                    <div>
                        <h3 className="text-md font-semibold text-gray-300 mb-3">At-Risk Tasks</h3>
                        {currentTasks.filter(task => task.priority === 'at-risk').map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                        Meeting Summary Assistant
                    </h2>
                    
                    <div className="mb-4">
                        <h3 className="text-md font-semibold text-gray-300 mb-2">Upcoming Meeting</h3>
                        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                            <h4 className="font-bold text-white">{meetingsData.upcoming.title}</h4>
                            <p className="text-sm text-gray-300 mt-1">{meetingsData.upcoming.time}</p>
                            <p className="text-xs text-gray-400 mt-2">{meetingsData.upcoming.preparation}</p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-md font-semibold text-gray-300 mb-2">Last Meeting Summary</h3>
                        <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                            <h4 className="font-bold text-white">{meetingsData.last.title}</h4>
                            <p className="text-sm text-gray-300 mt-1">{meetingsData.last.time}</p>
                            <div className="mt-2">
                                <p className="text-xs font-semibold text-gray-300">Key Decisions:</p>
                                <ul className="text-xs text-gray-400 list-disc pl-5 mt-1">
                                    <li>Move deadline to Friday</li>
                                    <li>Assign QA to Sarah</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Column 2: Learning & Growth */}
            <div className="md:col-span-1">
                <div className="bg-gray-800 rounded-xl shadow-lg p-5 mb-6 border border-gray-700">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                        <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
                        Mood & Productivity Tracker
                    </h2>
                    
                    <div className="mb-4">
                        <h3 className="text-md font-semibold text-gray-300 mb-2">How are you feeling today?</h3>
                        <div className="flex justify-between">
                            {moods.map((mood, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleMoodSelect(mood.label)}
                                    className={`text-2xl transition-all duration-200 hover:scale-125 ${
                                        selectedMood === mood.label ? 'scale-125 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]' : ''
                                    }`}
                                >
                                    {mood.emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-md font-semibold text-gray-300 mb-2">Productivity Insights</h3>
                        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                            <p className="text-sm text-gray-300 mb-2">You tend to complete tasks faster in the morning.</p>
                            <p className="text-sm font-medium text-white">Consider scheduling important work between 9am–11am.</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Bell className="w-5 h-5 text-blue-400 mr-2" />
                        Smart Notifications
                    </h2>
                    
                    <div className="space-y-3">
                        {notifications.map(notification => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Column 3: Performance & Feedback */}
            <div className="md:col-span-1">
                <div className="bg-gray-800 rounded-xl shadow-lg p-5 mb-6 border border-gray-700">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Star className="w-5 h-5 text-blue-400 mr-2" />
                        Performance Insights
                    </h2>
                    
                    <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                        <h3 className="font-bold text-white mb-2">Latest Performance Summary</h3>
                        <div className="space-y-3">
                            <div>
                                <h4 className="font-semibold text-gray-300 flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                                    Key Achievements
                                </h4>
                                <ul className="text-sm text-gray-400 list-disc pl-6 mt-1">
                                    <li>Completed client project ahead of schedule</li>
                                    <li>Excellent teamwork on Project X</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-gray-300 flex items-center">
                                    <Lightbulb className="w-4 h-4 text-blue-400 mr-2" />
                                    Improvement Areas
                                </h4>
                                <ul className="text-sm text-gray-400 list-disc pl-6 mt-1">
                                    <li>Time management for tight deadlines</li>
                                    <li>Documentation of project processes</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-gray-300 flex items-center">
                                    <ThumbsUp className="w-4 h-4 text-green-400 mr-2" />
                                    Strengths
                                </h4>
                                <ul className="text-sm text-gray-400 list-disc pl-6 mt-1">
                                    <li>Problem-solving abilities</li>
                                    <li>Communication with clients</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300">
                        Request Detailed Feedback
                    </button>
                </div>
                
                <div className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                        Weekly Progress
                    </h2>
                    
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <div className="bg-green-500 p-2 rounded-lg mr-3">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">5 Tasks Completed</h4>
                                <p className="text-xs text-gray-400">This week</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center">
                            <div className="bg-blue-500 p-2 rounded-lg mr-3">
                                <Clock className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">On-time Delivery</h4>
                                <p className="text-xs text-gray-400">80% of tasks</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center">
                            <div className="bg-purple-500 p-2 rounded-lg mr-3">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">Team Collaboration</h4>
                                <p className="text-xs text-gray-400">3 projects assisted</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Function to render the correct view based on state
    const renderMainContent = () => {
        switch (viewMode) {
            case 'add':
                return renderAddTaskForm();
            case 'schedule':
                return renderScheduleMeetingForm();
            case 'performance':
                return renderPerformanceView();
            case 'learning':
                return renderLearningResources();
            case 'list':
            default:
                return renderDashboardList();
        }
    };


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
                    
                    <div className="flex-1 max-w-md mx-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input 
                                type="text" 
                                placeholder="Ask AI..." 
                                className="w-full py-2 px-4 pl-10 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
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
                        <div className="flex items-center space-x-2">
                            <img 
                                src="https://randomuser.me/api/portraits/men/32.jpg" 
                                alt="User" 
                                className="w-10 h-10 rounded-full border-2 border-gray-600"
                            />
                            <span className="text-gray-200 font-medium">Jacob</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content (Conditional Rendering) */}
            <main className="container mx-auto px-4 py-6">
                {renderMainContent()}
            </main>

            {/* Bottom Section (AI Assistant & Quick Actions) */}
            {/* Only render this section on the main list view for better screen real estate management */}
            {viewMode === 'list' && (
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
                                        <p className="text-sm text-white">Hello! I'm your AI Task Coach. How can I help you today?</p>
                                    </div>
                                </div>
                                
                                <div className="flex">
                                    <input 
                                        type="text" 
                                        placeholder="Ask me anything..." 
                                        value={chatMessage}
                                        onChange={(e) => setChatMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
                                            onClick={() => handleQuickActionClick(action.label)}
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
            )}

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