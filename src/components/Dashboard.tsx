import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Clock, Star } from 'lucide-react';

const Dashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Real-Time{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Analytics Dashboard
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get instant insights with our comprehensive analytics dashboard. 
            Track performance, analyze trends, and make data-driven hiring decisions.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`rounded-3xl shadow-2xl backdrop-blur-lg bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 ${
            isHovered ? 'scale-105 border-white/20' : ''
          }`}>
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Interview Analytics</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: Star, label: 'English Fluency', value: '8.5/10', color: 'text-yellow-400' },
                  { icon: TrendingUp, label: 'Technical Depth', value: '7.9/10', color: 'text-blue-400' },
                  { icon: Users, label: 'Confidence Score', value: 'High', color: 'text-green-400' },
                  { icon: Clock, label: 'Response Time', value: '2.3s avg', color: 'text-purple-400' }
                ].map((kpi, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                      <span className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{kpi.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Performance Chart */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-4">Performance Over Time</h4>
                  <div className="h-48 bg-gray-900/50 rounded-lg relative overflow-hidden">
                    {/* Simulated chart */}
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-around p-4">
                      {[65, 80, 75, 90, 85, 95, 88].map((height, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-t from-yellow-400 to-yellow-300 w-8 rounded-t transition-all duration-1000 delay-300"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills Breakdown */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-4">Skills Assessment</h4>
                  <div className="space-y-4">
                    {[
                      { skill: 'React/JavaScript', score: 92, color: 'bg-blue-400' },
                      { skill: 'Problem Solving', score: 87, color: 'bg-green-400' },
                      { skill: 'Communication', score: 83, color: 'bg-yellow-400' },
                      { skill: 'System Design', score: 78, color: 'bg-purple-400' }
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                          <span>{item.skill}</span>
                          <span>{item.score}%</span>
                        </div>
                        <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} transition-all duration-1000 delay-500`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className={`absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full transition-all duration-300 ${
            isHovered ? 'animate-bounce' : 'animate-pulse'
          }`}></div>
          <div className={`absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full transition-all duration-300 ${
            isHovered ? 'animate-ping' : 'animate-pulse'
          }`}></div>
        </div>

        {/* CTA Button to Live Interview */}
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/interview')}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            Launch Live Interview Room
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;