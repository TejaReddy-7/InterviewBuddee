import React, { useState } from 'react';
import { Building2, User, ChevronRight, CheckCircle } from 'lucide-react';

const WhoItsFor = () => {
  const [activeTab, setActiveTab] = useState('hiring');

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Built For{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Whether you're hiring top talent or preparing for your dream job, 
            InterviewBuddee has you covered.
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-full p-2 border border-white/10">
            <button
              onClick={() => setActiveTab('hiring')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'hiring'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              For Hiring Managers
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'candidates'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              For Candidates
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative overflow-hidden">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-500 ${
            activeTab === 'hiring' ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
            {/* Hiring Managers */}
            <div className={`space-y-8 ${activeTab === 'hiring' ? 'block' : 'hidden lg:block'}`}>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">For Hiring Managers</h3>
                  <p className="text-gray-400">Streamline your recruitment process</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  'Reduce interview time by 60% with AI-generated questions',
                  'Get objective, bias-free candidate assessments',
                  'Access detailed analytics and performance insights',
                  'Standardize your interview process across teams',
                  'Generate comprehensive reports automatically'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:scale-105 transition-transform">
                <span>Start Hiring Better</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Candidates */}
            <div className={`space-y-8 ${activeTab === 'candidates' ? 'block' : 'hidden lg:block'}`}>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">For Candidates</h3>
                  <p className="text-gray-400">Practice and perfect your interview skills</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  'Practice with realistic AI-generated interview questions',
                  'Get instant feedback on your performance',
                  'Improve your communication and technical skills',
                  'Record practice sessions for self-review',
                  'Build confidence before the actual interview'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-full hover:scale-105 transition-transform">
                <span>Start Practice Sessions</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 border border-white/10">
            <blockquote className="text-2xl text-white font-light italic mb-4">
              "InterviewBuddee transformed our hiring process. We've reduced time-to-hire by 40% 
              while significantly improving candidate quality."
            </blockquote>
            <cite className="text-yellow-400 font-semibold">
              Sarah Chen, VP of Engineering at TechCorp
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;