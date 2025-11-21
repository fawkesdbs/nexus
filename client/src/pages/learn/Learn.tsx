import React, { useState } from "react";
import {
  Search,
  Play,
  Clock,
  Star,
  BookOpen,
  Users,
  Target,
  Award,
  Filter,
  Bookmark,
  Share2,
  Download,
} from "lucide-react";

// --- Type Definitions ---
interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number;
  instructor: string;
  thumbnail: string;
  category: string;
  progress?: number;
  isBookmarked?: boolean;
}

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  isCompleted: boolean;
}

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  message: string;
  timestamp: Date;
}

// --- Mock Data ---
const courses: Course[] = [
  {
    id: "1",
    title: "Cloud Architecture Fundamentals",
    description:
      "Master the basics of cloud infrastructure design and deployment strategies for scalable applications.",
    duration: "8 hours",
    level: "Beginner",
    rating: 4.8,
    students: 1247,
    instructor: "Dr. Sarah Chen",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    category: "Cloud Computing",
    progress: 75,
    isBookmarked: true,
  },
  {
    id: "2",
    title: "AI-Powered Data Analytics",
    description:
      "Learn to leverage machine learning for advanced data analysis and business intelligence.",
    duration: "12 hours",
    level: "Intermediate",
    rating: 4.9,
    students: 892,
    instructor: "Mark Rodriguez",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    category: "Data Science",
    progress: 30,
  },
  {
    id: "3",
    title: "DevOps & CI/CD Pipeline",
    description:
      "Build efficient development workflows and automated deployment pipelines.",
    duration: "10 hours",
    level: "Intermediate",
    rating: 4.7,
    students: 1563,
    instructor: "Alex Thompson",
    thumbnail:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop",
    category: "DevOps",
  },
  {
    id: "4",
    title: "Advanced Kubernetes Orchestration",
    description:
      "Deep dive into container orchestration, scaling, and management with Kubernetes.",
    duration: "15 hours",
    level: "Advanced",
    rating: 4.9,
    students: 567,
    instructor: "Maria Gonzalez",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    category: "Cloud Computing",
  },
  {
    id: "5",
    title: "Machine Learning Operations (MLOps)",
    description:
      "Bridge the gap between data science and production deployment.",
    duration: "14 hours",
    level: "Advanced",
    rating: 4.8,
    students: 723,
    instructor: "Dr. James Wilson",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    category: "Data Science",
  },
  {
    id: "6",
    title: "Serverless Architecture Patterns",
    description:
      "Design and implement scalable serverless applications on cloud platforms.",
    duration: "9 hours",
    level: "Intermediate",
    rating: 4.6,
    students: 934,
    instructor: "Lisa Park",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    category: "Cloud Computing",
  },
];

const categories = [
  "All",
  "Cloud Computing",
  "Data Science",
  "DevOps",
  "Security",
  "Programming",
];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const videoPlaylist: Video[] = [
  {
    id: "v1",
    title: "Introduction to Cloud Concepts",
    duration: "15:30",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=180&fit=crop",
    isCompleted: true,
  },
  {
    id: "v2",
    title: "Infrastructure as Code Basics",
    duration: "22:15",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=180&fit=crop",
    isCompleted: true,
  },
  {
    id: "v3",
    title: "Auto-scaling Strategies",
    duration: "18:45",
    thumbnail:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&h=180&fit=crop",
    isCompleted: false,
  },
  {
    id: "v4",
    title: "Monitoring & Analytics",
    duration: "25:10",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=180&fit=crop",
    isCompleted: false,
  },
];

// --- Reusable Components ---
interface CourseCardProps {
  course: Course;
  onBookmark: (id: string) => void;
  onStart: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onBookmark,
  onStart,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-600"
        }`}
      />
    ));
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:border-blue-500 transition-all duration-300 group">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => onBookmark(course.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              course.isBookmarked
                ? "bg-blue-600 text-white"
                : "bg-gray-900/80 text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${course.isBookmarked ? "fill-current" : ""}`}
            />
          </button>
          <button className="p-2 rounded-full bg-gray-900/80 text-gray-300 hover:bg-gray-800 backdrop-blur-sm transition-all">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        {course.progress && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-white mt-1 font-medium">
              {course.progress}% Complete
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              course.level === "Beginner"
                ? "bg-green-900/50 text-green-400"
                : course.level === "Intermediate"
                ? "bg-yellow-900/50 text-yellow-400"
                : "bg-red-900/50 text-red-400"
            }`}
          >
            {course.level}
          </span>
          <div className="flex items-center space-x-1">
            {renderStars(course.rating)}
            <span className="text-sm text-gray-400 ml-1">
              ({course.rating})
            </span>
          </div>
        </div>

        <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {course.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>
          <span className="text-blue-400 font-medium">{course.category}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {course.instructor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <span className="text-sm text-gray-300">{course.instructor}</span>
          </div>

          <button
            onClick={() => onStart(course)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all hover:scale-105"
          >
            <Play className="w-4 h-4" />
            <span>{course.progress ? "Continue" : "Start"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface VideoItemProps {
  video: Video;
  isActive?: boolean;
  onPlay: (video: Video) => void;
}

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  isActive = false,
  onPlay,
}) => {
  return (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
        isActive
          ? "bg-blue-900/30 border border-blue-700"
          : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
      }`}
      onClick={() => onPlay(video)}
    >
      <div className="relative shrink-0">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-20 h-12 object-cover rounded"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Play className="w-4 h-4 text-white" />
        </div>
        {video.isCompleted && (
          <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4
          className={`text-sm font-medium line-clamp-2 ${
            isActive ? "text-white" : "text-gray-300"
          }`}
        >
          {video.title}
        </h4>
        <p className="text-xs text-gray-400 mt-1">{video.duration}</p>
      </div>

      {isActive && (
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      )}
    </div>
  );
};

// --- Main Component ---
const Learn: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [bookmarkedCourses, setBookmarkedCourses] = useState<string[]>(["1"]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(
    courses[0]
  );
  const [currentVideo, setCurrentVideo] = useState<Video>(videoPlaylist[2]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "assistant",
      message:
        "Hello! I'm your learning assistant. I can help explain concepts, provide additional resources, or answer any questions about your courses.",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "All Levels" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleBookmark = (courseId: string) => {
    setBookmarkedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleStartCourse = (course: Course) => {
    setSelectedCourse(course);
    // In a real app, this would navigate to the course player
    console.log("Starting course:", course.title);
  };

  const handlePlayVideo = (video: Video) => {
    setCurrentVideo(video);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: newMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        message:
          "I understand your question about the course material. Let me provide some additional insights and resources to help you better understand this concept.",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Learn New Skills
              </h1>
              <p className="text-gray-400 mt-2">
                Advance your career with expert-led courses and AI-powered
                learning
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Learning Streak</p>
                <p className="text-xl font-bold text-white">12 days 🔥</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses, topics, or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              <button className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Course Catalog */}
          <div className="xl:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">
                  Recommended Courses
                </h2>
                <span className="text-gray-400">
                  {filteredCourses.length} courses found
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={{
                      ...course,
                      isBookmarked: bookmarkedCourses.includes(course.id),
                    }}
                    onBookmark={handleBookmark}
                    onStart={handleStartCourse}
                  />
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>

            {/* Currently Learning Section */}
            {selectedCourse && (
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">
                    Currently Learning
                  </h3>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>Download Resources</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Video Player */}
                  <div className="lg:col-span-2">
                    <div className="bg-black rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                        <img
                          src={currentVideo.thumbnail}
                          alt={currentVideo.title}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/20 transition-all">
                          <div className="bg-blue-600 hover:bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-bold text-white text-lg mb-2">
                        {currentVideo.title}
                      </h4>
                      <p className="text-gray-400">
                        Part of: {selectedCourse.title}
                      </p>
                    </div>
                  </div>

                  {/* Playlist */}
                  <div>
                    <h5 className="font-semibold text-gray-300 mb-3">
                      Course Content
                    </h5>
                    <div className="space-y-2">
                      {videoPlaylist.map((video) => (
                        <VideoItem
                          key={video.id}
                          video={video}
                          isActive={video.id === currentVideo.id}
                          onPlay={handlePlayVideo}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Learning Assistant */}
          <div className="xl:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 h-full flex flex-col">
              {/* Assistant Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="bg-linear-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Learning Assistant</h3>
                    <p className="text-xs text-gray-400">
                      AI-powered help available 24/7
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-700 text-gray-100 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-3 rounded transition-colors text-left">
                    Explain this concept
                  </button>
                  <button className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-3 rounded transition-colors text-left">
                    Related resources
                  </button>
                  <button className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-3 rounded transition-colors text-left">
                    Practice exercises
                  </button>
                  <button className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-3 rounded transition-colors text-left">
                    Career advice
                  </button>
                </div>

                {/* Message Input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about your course..."
                    className="flex-1 py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                  >
                    {/* <Send2 className="w-4 h-4" /> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
