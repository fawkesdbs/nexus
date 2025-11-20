import React, { useState } from 'react';
import { Sparkles, Star, LogIn, Menu } from 'lucide-react';


function landing() 
 {
return(
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-900 text-white">

      {/*---About the website---*/}
      <section className="mt-20 flex flex-col items-center space-y-10">
        
        {/*---Tagline to catch the user's attention--- */}
        <h2 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-300 drop-shadow-lg leading-tight">
          Productivity At <br className="sm:hidden"/>Its Peak
        </h2>
        
        {/* ---Mini description about what the website offers--- */}
        <div className="w-full max-w-3xl px-4 sm:px-0">
          <p className="text-lg text-gray-300 leading-relaxed">
            LightStars is the command center for next-generation data architects. We provide centralized,
            AI-driven tools for managing complex cloud infrastructures, automating deployment pipelines, and
            visualizing real-time operational data. Our platform cuts through the noise of modern IT,
            allowing teams to focus on innovation instead of maintenance. Join the future of streamlined operations.
          </p>
        </div>

        {/* Get Started Button */}
        <button 
        //   onClick={() => setCurrentPage('login')} //Navigate to Login Page
          className="flex items-center space-x-2 px-8 py-4 bg-yellow-500 text-gray-900 font-bold text-xl rounded-full shadow-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50 cursor-pointer"
        >
            {/* CAN ADD THE ICON if NECESSARY */}
          {/* <LogIn className="w-6 h-6" /> */}
          <span>Get Started</span>
        </button>
      </section>
      
     
      <Star className="absolute bottom-1/5 right-1/10 w-6 h-6 text-yellow-300 opacity-50 animate-bounce delay-500" />
      <Star className="absolute top-3/4 left-1/3 w-2 h-2 text-cyan-300 opacity-20" />
      
    </div>
  );
}

export default landing;