import React, { useState } from 'react';
import { Star, BarChart3, TrendingUp, Clock4, Lightbulb, ThumbsUp, X } from 'lucide-react';

/**
 * --- Mock Data from Dashboard.tsx for System Feedback ---
 * In a real application, this data would be fetched from a performance API endpoint.
 */
const mockPerformanceData = {
    completionRate: '85%',
    completionColor: 'text-green-400',
    averagePriority: 'Medium',
    timeSaved: '4 hrs',
    aiRecommendation: 'Your performance dipped slightly during late afternoons (3 PM - 5 PM). Consider blocking this time for low-cognitive tasks like email sorting or brief learning modules to maintain energy.',
    latestAchievements: [
        'Completed client project ahead of schedule',
        'Excellent teamwork on Project X',
    ],
    improvementAreas: [
        'Time management for tight deadlines',
        'Documentation of project processes',
    ],
    strengths: [
        'Problem-solving abilities',
        'Communication',
    ]
};

// --- Reusable Star Component (from previous Feedback component) ---
const StarRating = ({ rating, setRating }) => {
    const StarIcon = ({ selected, onClick }) => (
        <svg
            onClick={onClick}
            className={`h-10 w-10 cursor-pointer transition-colors duration-200 ${
                selected ? 'text-yellow-400 fill-current' : 'text-gray-600 hover:text-yellow-400'
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );

    return (
        <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((index) => (
                <StarIcon
                    key={index}
                    selected={index <= rating}
                    onClick={() => setRating(index)}
                />
            ))}
        </div>
    );
};

// --- New Component: System Performance Feedback Section ---
const SystemPerformanceFeedback = () => (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-inner border border-zinc-700">
        <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3" /> Your Weekly Performance Insight
        </h2>
        <p className="text-gray-400 mb-6">
            This is automated feedback based on your task completion rate, time management, and AI usage this past week.
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <p className="text-sm text-gray-400">Completion Rate</p>
                <p className={`text-2xl font-bold ${mockPerformanceData.completionColor} flex items-center justify-center mt-1`}>
                    {mockPerformanceData.completionRate}
                    <TrendingUp className="w-4 h-4 ml-1" />
                </p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <p className="text-sm text-gray-400">Time Saved (AI Prep)</p>
                <p className="text-2xl font-bold text-blue-400 flex items-center justify-center mt-1">
                    {mockPerformanceData.timeSaved}
                    <Clock4 className="w-4 h-4 ml-1" />
                </p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <p className="text-sm text-gray-400">Average Priority</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">
                    {mockPerformanceData.averagePriority}
                </p>
            </div>
        </div>

        {/* AI Growth Recommendation */}
        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700 mb-6">
            <h4 className="font-semibold text-white mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-blue-300" /> AI Growth Recommendation
            </h4>
            <p className="text-gray-300 text-sm">
                {mockPerformanceData.aiRecommendation}
            </p>
        </div>

        {/* Strengths and Improvement Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-900/30 border border-green-700">
                <h4 className="font-semibold text-green-300 mb-2 flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-2" /> Strengths
                </h4>
                <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                    {mockPerformanceData.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </div>
            <div className="p-4 rounded-lg bg-orange-900/30 border border-orange-700">
                <h4 className="font-semibold text-orange-300 mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2" /> Improvement Areas
                </h4>
                <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                    {mockPerformanceData.improvementAreas.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
            </div>
        </div>
    </div>
);


// --- Main Feedback Component ---
const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [viewMode, setViewMode] = useState<'rating' | 'feedback'>('rating'); // To control which section is active

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback Submitted:', { rating, feedbackText });
        alert(`Thank you for your ${rating}-star feedback!`);
        setRating(0);
        setFeedbackText('');
        setViewMode('rating');
    };

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6 md:p-10 font-sans">
            
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-white mb-2">👋 User Feedback & System Insight</h1>
                <p className="text-gray-400">Review your AI-generated performance feedback and share your thoughts to help us improve.</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                
                {/* 1. System Feedback Section (Performance Insights) */}
                <div className="lg:w-2/3">
                    <SystemPerformanceFeedback />
                </div>
                
                {/* 2. User Input Form (Rating & Comments) */}
                <div className="lg:w-1/3 bg-zinc-800 p-6 rounded-xl shadow-2xl h-fit sticky top-10 border border-zinc-700">
                    <form onSubmit={handleSubmit}>
                        
                        <h2 className="text-xl font-semibold mb-4 text-white">Rate Your Experience Today</h2>
                        
                        {/* Rating Section */}
                        <div className="mb-6">
                            <StarRating rating={rating} setRating={setRating} />
                            <p className="text-sm text-gray-400 mt-2">
                                {rating === 0 && "Click a star to rate"}
                                {rating === 1 && "Very Poor"}
                                {rating === 2 && "Poor"}
                                {rating === 3 && "Fair"}
                                {rating === 4 && "Good"}
                                {rating === 5 && "Excellent"}
                            </p>
                        </div>
                        
                        <hr className="border-gray-700 mb-6" />

                        {/* Detailed Feedback Section */}
                        <div className="mb-6">
                            <label htmlFor="feedback" className="block text-md font-semibold mb-2">
                                What are your thoughts on your performance?
                            </label>
                            <textarea
                                id="feedback"
                                rows="4"
                                className="w-full bg-zinc-900 text-white p-3 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 resize-none"
                                placeholder="E.g., I found the AI recommendation for time blocking very helpful, but the completion rate metric felt inaccurate..."
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        {/* Submission Button */}
                        <button
                            type="submit"
                            disabled={rating === 0 || feedbackText.length < 10}
                            className={`w-full py-3 rounded-lg font-bold text-md transition duration-200 ${
                                rating === 0 || feedbackText.length < 10
                                    ? 'bg-blue-600/50 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                            }`}
                        >
                            Submit Feedback
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-3">
                            *Minimum 10 characters required to submit.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Feedback;