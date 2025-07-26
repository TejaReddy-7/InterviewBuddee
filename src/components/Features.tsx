import React from 'react';
import { FileText, Brain, Video, BarChart3 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: 'Upload Resume & JD → AI Questions Instantly',
      description: 'Smart AI analyzes job requirements and candidate profile to generate targeted questions automatically.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Brain,
      title: 'AI Analyzes Every Answer in Real-Time',
      description: 'Advanced natural language processing evaluates responses for technical accuracy, communication skills, and confidence.',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      icon: Video,
      title: 'Built-in Video, Recording, Screen Sharing',
      description: 'Complete interview suite with HD video, automatic recording, and seamless screen sharing capabilities.',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: BarChart3,
      title: 'Final Reports with English, Tech, Comms Ratings',
      description: 'Comprehensive scoring across multiple dimensions with detailed feedback and improvement suggestions.',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Modern Hiring
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to conduct professional AI-powered interviews, 
            from question generation to detailed analytics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl shadow-xl backdrop-blur-lg bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/20"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-full h-full text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;