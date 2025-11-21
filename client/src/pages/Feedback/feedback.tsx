import React, { useState } from 'react';

/**
 * Component for the Feedback Page
 */
const Feedback = () => {
    // State to manage the selected rating (1 to 5 stars)
    const [rating, setRating] = useState(0);
    // State to manage the feedback text
    const [feedbackText, setFeedbackText] = useState('');
    
    // Function to handle form submission (placeholder)
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Feedback Submitted:', { rating, feedbackText });
        alert(`Thank you for your ${rating}-star feedback!`);
        // Reset form after submission
        setRating(0);
        setFeedbackText('');
    };

    /**
     * Component for a single star icon
     */
    type StarProps = {
        selected: boolean;
        onClick: () => void;
    };

    const Star: React.FC<StarProps> = ({ selected, onClick }) => (
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
        <div className="min-h-screen bg-zinc-900 text-white p-6 md:p-10 font-sans">
            
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-white mb-2">👋 User Feedback</h1>
                <p className="text-gray-400">We value your opinion! Help us improve your experience by sharing your thoughts.</p>
            </header>

            <hr className="border-gray-700 mb-8" />

            <div className="max-w-3xl mx-auto bg-zinc-800 p-8 rounded-xl shadow-2xl">
                <form onSubmit={handleSubmit}>
                    
                    {/* 1. Rating Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">How would you rate your experience?</h2>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <Star
                                    key={index}
                                    selected={index <= rating}
                                    onClick={() => setRating(index)}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            {rating === 0 && "Click a star to rate"}
                            {rating === 1 && "Very Poor"}
                            {rating === 2 && "Poor"}
                            {rating === 3 && "Fair"}
                            {rating === 4 && "Good"}
                            {rating === 5 && "Excellent"}
                        </p>
                    </div>
                    
                    <hr className="border-gray-700 mb-8" />

                    {/* 2. Detailed Feedback Section */}
                    <div className="mb-8">
                        <label htmlFor="feedback" className="block text-xl font-semibold mb-3">
                            Tell us more about your experience:
                        </label>
                        <textarea
                            id="feedback"
                            rows={6}
                            className="w-full bg-zinc-900 text-white p-4 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 resize-none"
                            placeholder="Please include details about what you liked, what could be improved, or any issues you encountered..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* 3. Suggestion and Contact Option (Optional) */}
                    <div className="mb-8 p-4 bg-zinc-700/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                            If you require a direct response, please ensure your profile information (email/phone) is up-to-date.
                        </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Upcoming Events */}
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white flex items-center">
                  <Clock className="w-5 h-5 text-blue-400 mr-2" />
                  Upcoming Events
                </h3>
                <button
                  onClick={loadEvents}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

                    {/* 4. Submission Button */}
                    <button
                        type="submit"
                        disabled={rating === 0 || feedbackText.length < 10}
                        className={`w-full py-3 rounded-lg font-bold text-lg transition duration-200 ${
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
      )}
    </div>
  );
};

export default Feedback;
