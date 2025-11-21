import React from 'react';

/**
 * Mock data for the courses shown in the image.
 */
interface Course {
    title: string;
    description: string;
    progress: string;
    level: string;
    hours: number;
    learners: string;
    rating: string;
    reviews: string;
    instructor: string;
    instructorInitials: string;
    category: string;
    image: string;
}

const allCoursesData: Course[] = [
    {
        title: 'Cloud Architecture Fundamentals',
        description: 'Master the basics of cloud infrastructure design and deployment strategies for scalable...',
        progress: '75%',
        level: 'Beginner',
        hours: 8,
        learners: '1,247',
        rating: '4.8',
        reviews: '892',
        instructor: 'Dr. Sarah Chen',
        instructorInitials: 'DSC',
        category: 'Cloud Computing',
        image: 'url("https://via.placeholder.com/400x160/0a0a0a/ffffff?text=Earth+View")', // Placeholder for the planet image
    },
    {
        title: 'AI-Powered Data Analytics',
        description: 'Learn to leverage machine learning for advanced data analysis and business intelligence.',
        progress: '0%',
        level: 'Intermediate',
        hours: 12,
        learners: '892',
        rating: '4.7',
        reviews: '320',
        instructor: 'Prof. Mark Rivera',
        instructorInitials: 'MR',
        category: 'Data Science',
        image: 'url("https://via.placeholder.com/400x160/0a0a0a/ffffff?text=Analytics")',
    },
    // Adding 4 more placeholder courses to match "6 courses found" count, though only 2 are visible in the image.
    { title: 'Course 3', description: 'Placeholder course...', progress: '0%', level: 'Beginner', hours: 5, learners: '300', rating: '4.5', reviews: '100', instructor: 'J. Doe', instructorInitials: 'JD', category: 'DevOps', image: 'url("https://via.placeholder.com/400x160/0a0a0a/ffffff?text=DevOps")', },
    { title: 'Course 4', description: 'Placeholder course...', progress: '0%', level: 'Intermediate', hours: 10, learners: '500', rating: '4.6', reviews: '120', instructor: 'A. Smith', instructorInitials: 'AS', category: 'Security', image: 'url("https://via.placeholder.com/400x160/0a0a0a/ffffff?text=Security")', },
    { title: 'Course 5', description: 'Placeholder course...', progress: '0%', level: 'Expert', hours: 15, learners: '700', rating: '4.7', reviews: '150', instructor: 'B. Lee', instructorInitials: 'BL', category: 'UX/UI', image: 'url("https://via.placeholder.com/400x160/0a0a0a/ffffff?text=UX/UI")', },
    { title: 'Course 6', description: 'Placeholder course...', progress: '0%', level: 'Beginner', hours: 7, learners: '900', rating: '4.4', reviews: '90', instructor: 'C. King', instructorInitials: 'CK', category: 'Programming', image: 'url("https://via.placeholder.com/400x160/0a0a0a/ffffff?text=Programming")', },
];

/**
 * Course Card Component styled to match the image precisely.
 */
const CourseCard: React.FC<{ course: Course }> = ({ course }: { course: Course }) => {
    const isCompleted = course.progress === '75%'; // Only the first course is 75% complete in the image
    const isBeginner = course.level === 'Beginner';

    return (
        // ******************************************************
        // * MODIFICATIONS HERE:
        // * 1. Width Increase: Using 'w-[110%]' and 'ml-[-5%]'
        // * 2. Height Reduction: Changed 'h-44' to 'h-[calc(176px * 0.9)]'
        // ******************************************************
        <div className="bg-zinc-800 rounded-xl shadow-lg flex flex-col overflow-hidden w-[110%] ml-[-5%]">
            {/* Course Image/Progress Area */}
            <div className="relative h-[158.4px]"> {/* Original h-44 is 176px; 176 * 0.9 = 158.4px */}
                {/* Image Placeholder Div */}
                <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: course.image }}
                >
                    {/* Corner Icons (Save/Share) */}
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button className="p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
                        </button>
                        <button className="p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zM10 13a1 1 0 001-1v-2a1 1 0 10-2 0v2a1 1 0 001 1z" clipRule="evenodd" /></svg>
                        </button>
                    </div>

                    {/* Progress Text and Bar */}
                    {isCompleted && (
                        <span className="absolute bottom-4 left-4 text-xs font-semibold text-white bg-black/40 px-2 py-1 rounded-md">
                            {course.progress} Complete
                        </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700/80">
                        <div 
                            className={`h-2 ${isCompleted ? 'bg-green-500' : 'bg-transparent'}`}
                            style={{ width: isCompleted ? course.progress : '0%' }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                {/* Level Badge and Rating */}
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-semibold py-1 px-2 rounded ${
                        isBeginner ? 'text-green-400 bg-green-900/50' : 'text-yellow-400 bg-yellow-900/50'
                    } mb-1 inline-block`}>
                        {course.level}
                    </span>
                    <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white font-semibold">{course.rating}</span>
                        <span className="text-gray-400">({course.reviews})</span>
                    </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-sm text-gray-400 mb-4 flex-grow">{course.description}</p>

                {/* Instructor/Category/Stats Row */}
                <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                            {course.instructorInitials}
                        </div>
                        <span className="text-xs text-gray-400">{course.instructor}</span>
                    </div>
                    <span className="text-blue-400 bg-blue-900/50 px-2 py-0.5 rounded font-medium">
                        {course.category}
                    </span>
                </div>
                
                {/* Stats and Continue Button */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                    <div className="flex space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                            {/* Clock Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{course.hours} hours</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            {/* People Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2a3 3 0 015.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M12 10a2 2 0 100-4 2 2 0 000 4zm-7 12V7.4l2.4-2.4 2.4 2.4V22m-7-9h14" /></svg>
                            <span>{course.learners}</span>
                        </div>
                    </div>
                    <button className="py-2 px-4 rounded-full font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 transition">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};


const Learn = () => {
    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6 md:p-10 font-sans">
            {/* Header Section */}
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-semibold text-white">Learn New Skills</h1>
                
                {/* Learning Streak */}
                <div className="flex items-center space-x-2 bg-zinc-800 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm-1-6h2v4h-2v-4zm-2 2h2v2h-2v-2z" /></svg>
                    <div>
                        <p className="text-xs text-gray-400 leading-none">Learning Streak</p>
                        <p className="text-xl font-bold text-orange-400 leading-none">12 days</p>
                    </div>
                </div>
            </header>

            {/* --- */}

            {/* Search and Filters */}
            <div className="flex flex-wrap gap-4 mb-8 items-center">
                <div className="relative flex-1 min-w-[200px] md:min-w-[300px] lg:min-w-[400px]">
                    <input
                        type="text"
                        placeholder="Search courses, topics, or instructors..."
                        className="w-full bg-zinc-800 text-white rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                {/* The selects are implemented as dropdowns with the specified text */}
                <select className="bg-zinc-800 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                    <option>All</option>
                </select>
                <select className="bg-zinc-800 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                    <option>All Levels</option>
                </select>
                <button className="bg-zinc-800 text-white rounded-lg py-3 px-4 flex items-center space-x-2 hover:bg-zinc-700 transition font-semibold text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                    <span>More Filters</span>
                </button>
            </div>

            {/* --- */}

            {/* Main Content Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Courses Section (Left) */}
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Recommended Courses</h2>
                    <div className="text-gray-400 text-sm mb-6">
                        6 courses found
                    </div>
                    
                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {allCoursesData.slice(0, 6).map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                </div>

                {/* Learning Assistant Sidebar (Right) */}
                <div className="w-full lg:w-72">
                    <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl sticky top-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 rounded-full bg-purple-600 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Learning Assistant</h3>
                        </div>
                        <p className="text-sm text-purple-400 mb-4">AI-powered help available 24/7</p>

                        <div className="bg-zinc-900 p-3 rounded-lg text-sm">
                            <p className="text-white mb-2 leading-snug">Hello! I'm your learning assistant. I can help explain concepts, provide additional resources, or answer any questions about your courses.</p>
                            <p className="text-gray-500 text-xs text-right">12:45 AM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Learn;
