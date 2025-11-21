import React, { useState } from 'react';
import { 
    Brain, Bell, Search, User, Calendar, 
    MessageSquare, Plus, BarChart3, BookOpen,
    Star, Lightbulb, ThumbsUp, TrendingUp,
    CheckCircle2, Clock, Users, Send,
    AlertCircle, Check, CalendarDays
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

const events: Event[] = [
    {
        id: '1',
        name: 'Quarterly Planning Session',
        venue: 'Conference Room A',
        date: '2024-01-20',
        time: '09:00 AM - 11:00 AM',
        type: 'meeting',
        attendees: 12,
        status: 'upcoming'
    },
    {
        id: '2',
        name: 'Cloud Architecture Workshop',
        venue: 'Training Center',
        date: '2024-01-22',
        time: '02:00 PM - 04:00 PM',
        type: 'training',
        attendees: 25,
        status: 'upcoming'
    },
    {
        id: '3',
        name: 'Project Alpha Deadline',
        venue: 'Remote',
        date: '2024-01-25',
        time: '05:00 PM',
        type: 'deadline',
        attendees: 8,
        status: 'upcoming'
    },
    {
        id: '4',
        name: 'Team Building Lunch',
        venue: 'The Bistro Downtown',
        date: '2024-01-18',
        time: '12:30 PM - 02:00 PM',
        type: 'social',
        attendees: 15,
        status: 'ongoing'
    }
];

const summaryData: SummaryItem[] = [
    {
        id: '1',
        category: 'Completed Tasks',
        count: 15,
        change: +12,
        icon: CheckCircle2,
        color: 'text-green-400'
    },
    {
        id: '2',
        category: 'Pending Tasks',
        count: 8,
        change: -3,
        icon: Clock,
        color: 'text-yellow-400'
    },
    {
        id: '3',
        category: 'Team Members',
        count: 24,
        change: +2,
        icon: Users,
        color: 'text-blue-400'
    },
    {
        id: '4',
        category: 'Upcoming Events',
        count: 6,
        change: +1,
        icon: Calendar,
        color: 'text-purple-400'
    }
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

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const getEventTypeStyles = (type: string) => {
        switch (type) {
            case 'meeting':
                return { bg: 'bg-blue-900/30', border: 'border-blue-500', text: 'text-blue-400' };
            case 'training':
                return { bg: 'bg-purple-900/30', border: 'border-purple-500', text: 'text-purple-400' };
            case 'deadline':
                return { bg: 'bg-red-900/30', border: 'border-red-500', text: 'text-red-400' };
            case 'social':
                return { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-400' };
            default:
                return { bg: 'bg-gray-700', border: 'border-gray-500', text: 'text-gray-400' };
        }
    };

    const styles = getEventTypeStyles(event.type);

    return (
        <div className={`p-4 rounded-lg border-l-4 ${styles.bg} ${styles.border} hover:shadow-lg transition-all`}>
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-white text-sm">{event.name}</h4>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${styles.bg} ${styles.text}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
            </div>
            <div className="space-y-1 text-xs">
                <div className="flex items-center text-gray-300">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{event.venue}</span>
                </div>
                <div className="flex items-center text-gray-300">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center text-gray-300">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{event.attendees} attendees</span>
                </div>
            </div>
        </div>
    );
};

interface SummaryCardProps {
    item: SummaryItem;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ item }) => {
    const Icon = item.icon;
    return (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${item.color.replace('text', 'bg')} bg-opacity-20`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className={`text-sm font-semibold ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change}%
                </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{item.count}</h3>
            <p className="text-sm text-gray-400">{item.category}</p>
        </div>
    );
};

// --- Main Dashboard Component ---
const Dashboard: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [chatMessage, setChatMessage] = useState('');
    const [hasNewNotifications, setHasNewNotifications] = useState(true);

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

    const filteredEvents = events.filter(event => 
        activeEventFilter === 'all' || event.type === activeEventFilter
    );

    const eventFilters = [
        { key: 'all', label: 'All Events' },
        { key: 'meeting', label: 'Meetings' },
        { key: 'training', label: 'Training' },
        { key: 'deadline', label: 'Deadlines' },
        { key: 'social', label: 'Social' }
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

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
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
                                {tasks.slice(0, 3).map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                            
                            <div>
                                <h3 className="text-md font-semibold text-gray-300 mb-3">At-Risk Tasks</h3>
                                {tasks.filter(task => task.priority === 'at-risk').map(task => (
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
                                    <h4 className="font-bold text-white">{meetings.upcoming.title}</h4>
                                    <p className="text-sm text-gray-300 mt-1">{meetings.upcoming.time}</p>
                                    <p className="text-xs text-gray-400 mt-2">{meetings.upcoming.preparation}</p>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-md font-semibold text-gray-300 mb-2">Last Meeting Summary</h3>
                                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                                    <h4 className="font-bold text-white">{meetings.last.title}</h4>
                                    <p className="text-sm text-gray-300 mt-1">{meetings.last.time}</p>
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
            </main>

            {/* Bottom Section */}
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