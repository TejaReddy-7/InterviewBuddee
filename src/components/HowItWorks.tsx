import React from 'react';
import { Upload, Brain, Video, Award, FileCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload CV + JD',
      description: 'Simply upload the candidate\'s resume and job description to get started.',
      color: 'text-yellow-400'
    },
    {
      icon: Brain,
      title: 'AI Generates Questions',
      description: 'Our AI analyzes both documents and creates personalized interview questions.',
      color: 'text-blue-400'
    },
    {
      icon: Video,
      title: 'Video Interview Begins',
      description: 'Conduct the interview with built-in video, recording, and screen sharing.',
      color: 'text-green-400'
    },
    {
      icon: Award,
      title: 'AI Scores Every Answer',
      description: 'Real-time AI analysis evaluates responses across multiple criteria.',
      color: 'text-purple-400'
    },
    {
      icon: FileCheck,
      title: 'Auto-Generated Report',
      description: 'Receive comprehensive reports with detailed scoring and recommendations.',
      color: 'text-pink-400'
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            How It{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Five simple steps to transform your interview process with AI intelligence
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-yellow-400 via-blue-400 via-green-400 via-purple-400 to-pink-400 hidden lg:block"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start gap-8 group ${
                  index % 2 === 1 ? 'lg:flex-row-reverse lg:text-right' : ''
                }`}
              >
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 border-2 border-gray-600 flex items-center justify-center group-hover:border-white/30 transition-colors duration-300 ${step.color}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 text-black text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 group-hover:translate-x-2 transition-transform duration-300">
                  <div className="rounded-2xl shadow-xl backdrop-blur-lg bg-white/5 border border-white/10 p-8 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300">
            Start Your First Interview
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;