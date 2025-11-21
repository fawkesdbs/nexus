// // function Feedback() {
// //   return (
// //     <div>
// //       <h1 className="text-3xl font-bold mb-4">Feedback Page</h1>
// //       <p>This is the feedback page where users can provide their feedback.</p>
// //     </div>
// //   );
// // }

// // export default Feedback;

// import React from 'react';
// import { Brain, Star, TrendingUp, CheckCircle2, Clock, X, Zap, Target, BookOpen, BarChart3 } from 'lucide-react';

// // --- Type Definitions (Must be defined or imported) ---
// interface PerformanceData {
//     completionRate: number;
//     avgPriority: 'High' | 'Medium' | 'Low';
//     timeSaved: number;
//     tasksCompleted: number;
//     onTimeDelivery: number;
//     selectedMood: string | null;
// }

// interface AIFeedbackProps {
//     performanceData: PerformanceData;
//     onClose: () => void;
// }

// // --- AI Feedback Generation Logic ---

// /**
//  * Generates an overall summary based on key metrics.
//  */
// const generateOverallSummary = (data: PerformanceData): { title: string, content: string, color: string } => {
//     const { completionRate, timeSaved, onTimeDelivery } = data;
    
//     if (completionRate >= 90 && onTimeDelivery >= 90) {
//         return { 
//             title: 'Exceptional Week: High-Impact Execution!', 
//             content: Your **${completionRate}% completion rate** combined with a high on-time delivery metric shows superb planning and execution. The ${timeSaved} hours saved through efficiency suggests you are a time management leader., 
//             color: 'text-green-400' 
//         };
//     } else if (completionRate >= 80 && onTimeDelivery >= 80) {
//         return { 
//             title: 'Strong Performance: Consistent & Reliable', 
//             content: You successfully completed **${data.tasksCompleted} tasks** with great consistency. While strong, focus on the 'at-risk' tasks in the coming week to push your on-time delivery closer to 100%., 
//             color: 'text-yellow-400' 
//         };
//     } else {
//         return { 
//             title: 'Solid Progress: Focus on Bottlenecks', 
//             content: Your metrics indicate some friction points. Reviewing the time sink for the past two days could help recover some of the potential ${timeSaved} hours of efficiency. Let's stabilize the completion rate., 
//             color: 'text-orange-400' 
//         };
//     }
// };

// /**
//  * Provides a targeted growth recommendation based on performance and mood.
//  */
// const generateGrowthRecommendation = (data: PerformanceData): string => {
//     if (data.onTimeDelivery < 80 && data.avgPriority === 'High') {
//         return "🎯 *Prioritization & Scoping*: The overlap of missed deadlines and High Priority suggests initial scoping issues. Use the first hour on Monday to create a 'non-negotiable' focus list of max 3 high-priority tasks.";
//     }
//     if (data.timeSaved < 4) {
//         return "💡 *Maximize AI Tooling*: You've saved ${data.timeSaved} hours, but there's potential for more. Try activating 'AI Draft Mode' for all internal communications to free up 15 minutes per day.";
//     }
//     if (data.selectedMood && ['stressed', 'tired'].includes(data.selectedMood)) {
//         return "🧘 *Energy Management*: Your mood tracker suggests potential burnout. Utilize the 'Schedule Meeting' function to block off a 30-minute 'Recharge' slot in the mid-afternoon. Performance follows energy.";
//     }
//     return "🚀 *Scale Your Strengths*: You are performing excellently. Your next step is mentorship: consider documenting your high-efficiency workflow and sharing it with one team member this week.";
// };

// /**
//  * Provides feedback based on the self-reported mood.
//  */
// const generateMoodFeedback = (mood: string | null): string => {
//     if (!mood) return "Log your mood daily! Correlating your feelings with productivity unlocks the deepest, most personal insights into your work-life balance.";
    
//     switch (mood) {
//         case 'happy':
//             return "Your happy mood correlates with high task velocity! Note down what contributed to this state and aim to replicate those conditions.";
//         case 'stressed':
//             return "Stress detected. This often precedes a dip in on-time delivery. Review the 'At-Risk Tasks' now and either delegate or push a deadline to reduce pressure.";
//         case 'tired':
//             return "Tiredness usually means focus is compromised. Focus only on one important task for the next 60 minutes, then take a full 15-minute break away from your screen.";
//         default:
//             return "Consistency in tracking is key. Your current mood is logged, which is a great start for longitudinal analysis.";
//     }
// };

// // --- Main Component ---

// const AIFeedbackComponent: React.FC<AIFeedbackProps> = ({ performanceData, onClose }) => {
    
//     const summary = generateOverallSummary(performanceData);
//     const recommendation = generateGrowthRecommendation(performanceData);
//     const moodFeedback = generateMoodFeedback(performanceData.selectedMood);

//     // Helper to render metric badges
//     const MetricBadge: React.FC<{ title: string, value: string | number, icon: React.ReactNode, color: string }> = ({ title, value, icon, color }) => (
//         <div className="bg-gray-700 p-5 rounded-lg border border-gray-600 flex flex-col items-start">
//             <div className={text-sm font-medium ${color} mb-1 flex items-center}>
//                 {icon} <span className="ml-2">{title}</span>
//             </div>
//             <p className="text-3xl font-bold text-white">{value}</p>
//         </div>
//     );

//     return (
//         <div className="flex flex-col bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 min-h-[70vh]">
//             <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
//                 <h3 className="text-3xl font-extrabold text-white flex items-center">
//                     <Zap className="w-8 h-8 mr-3 text-blue-400 fill-blue-400/20" /> Detailed AI Feedback
//                 </h3>
//                 <button
//                     onClick={onClose}
//                     className="p-2 rounded-full bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white transition"
//                     aria-label="Close feedback"
//                 >
//                     <X className="w-6 h-6" />
//                 </button>
//             </div>
            
//             {/* Overall Summary */}
//             <div className={p-6 rounded-xl border-l-4 shadow-lg mb-6 border-blue-500 bg-blue-900/30}>
//                 <h4 className={text-xl font-bold mb-2 ${summary.color}}>
//                     <Star className="w-5 h-5 mr-2 inline-block" /> {summary.title}
//                 </h4>
//                 <p className="text-gray-300 text-base">{summary.content}</p>
//             </div>

//             {/* Metrics Snapshot */}
//             <h4 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
//                 <BarChart3 className="w-5 h-5 mr-2 text-blue-400" /> Week-at-a-Glance
//             </h4>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//                 <MetricBadge 
//                     title="Completion Rate" 
//                     value={${performanceData.completionRate}%} 
//                     icon={<CheckCircle2 className="w-5 h-5" />} 
//                     color="text-green-400"
//                 />
//                 <MetricBadge 
//                     title="Tasks Completed" 
//                     value={performanceData.tasksCompleted} 
//                     icon={<TrendingUp className="w-5 h-5" />} 
//                     color="text-blue-400"
//                 />
//                 <MetricBadge 
//                     title="Time Saved (AI Prep)" 
//                     value={${performanceData.timeSaved} hrs} 
//                     icon={<Clock className="w-5 h-5" />} 
//                     color="text-yellow-400"
//                 />
//                 <MetricBadge 
//                     title="On-Time Delivery" 
//                     value={${performanceData.onTimeDelivery}%} 
//                     icon={<Target className="w-5 h-5" />} 
//                     color="text-purple-400"
//                 />
//             </div>

//             {/* Growth Recommendation */}
//             <div className="bg-gray-700 p-6 rounded-xl border-l-4 border-yellow-500 shadow-lg mb-6">
//                 <h4 className="text-xl font-bold text-yellow-400 mb-3 flex items-center">
//                     <Brain className="w-6 h-6 mr-2 text-yellow-500" /> Actionable Growth Strategy
//                 </h4>
//                 <p className="text-gray-300 text-base">
//                     {recommendation}
//                 </p>
//             </div>

//             {/* Mood Insight */}
//             <div className="bg-gray-700 p-6 rounded-xl border-l-4 border-purple-500 shadow-lg mb-8">
//                 <h4 className="text-xl font-bold text-purple-400 mb-3 flex items-center">
//                     <BookOpen className="w-6 h-6 mr-2 text-purple-500" /> Wellbeing Insight
//                 </h4>
//                 <p className="text-gray-300 text-base">
//                     <span className="font-semibold text-white">Mood Logged: {performanceData.selectedMood ? performanceData.selectedMood.charAt(0).toUpperCase() + performanceData.selectedMood.slice(1) : 'N/A'}</span>
//                     <br/>
//                     {moodFeedback}
//                 </p>
//             </div>


//             <div className="mt-auto pt-4 border-t border-gray-700">
//                 <button
//                     onClick={onClose}
//                     className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition border border-gray-600"
//                 >
//                     <X className="w-5 h-5" />
//                     <span>Return to Dashboard Overview</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AIFeedbackComponent;