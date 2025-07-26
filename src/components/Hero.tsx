import React from 'react';
import { Play, Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-6xl font-bold tracking-tight text-white leading-tight">
                Interview Intelligence,{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  Supercharged by AI
                </span>
              </h1>
              <p className="text-xl text-neutral-400 mt-4 max-w-xl leading-relaxed">
                Real-time video, AI-generated questions, automatic scoring — all in one platform. 
                Transform your hiring process with intelligent automation.
              </p>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <span className="relative z-10 flex items-center gap-2">
                  Start Interview Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              </button>
              
              <button className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:border-white/40 hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Live Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">10K+</div>
                <div className="text-sm text-gray-400">Interviews Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">95%</div>
                <div className="text-sm text-gray-400">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">2Min</div>
                <div className="text-sm text-gray-400">Setup Time</div>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Mockup */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="relative group">
              {/* Main mockup container */}
              <div className="relative w-[400px] h-[300px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg transform rotate-3 hover:rotate-0 transition-transform duration-500">
                {/* Screen content */}
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-400">InterviewBuddee Studio</div>
                  </div>
                  
                  {/* Video placeholder */}
                  <div className="flex-1 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent"></div>
                    <div className="absolute top-4 left-4 text-xs text-yellow-400 font-semibold">● REC</div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-xs text-white mb-2">AI Analysis: High confidence detected</div>
                      <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-400 to-green-400 w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Question display */}
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Current Question:</div>
                    <div className="text-sm text-white">Tell me about your experience with React...</div>
                  </div>
                </div>
                
                {/* Floating AI particles */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-1/2 -right-6 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-70"></div>
              </div>
              
              {/* Shadow/reflection */}
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-2xl transform translate-y-8 scale-95 blur-xl opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;