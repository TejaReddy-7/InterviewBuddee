import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, RotateCcw, BookOpen, Briefcase, TrendingUp, ChevronRight } from 'lucide-react';

const CenteredHeroPanel = () => {
  // Mock data
  const candidate = {
    name: 'Alex Morgan',
    role: '.NET + Azure Developer',
    interviewDate: 'July 22, 2025',
    status: 'shortlisted', // in-review, shortlisted, rejected
    avatar: 'AM'
  };
  
  const interviewSummary = {
    aiVerdict: { score: 9.2, label: 'High Fit' },
    communication: 8.5,
    systemDesign: 9.0,
    llmUsage: 6.5,
    finalScore: 87
  };
  
  const aiSummary = "Candidate showed excellent command over cloud architecture and real-world system design but needs slight improvement in LLM-based workflows.";
  
  // Mock transcript data
  const transcriptData = [
    {
      id: 1,
      question: 'Explain the difference between IEnumerable and IQueryable in C#.',
      yourAnswer: 'IEnumerable is used for in-memory collections, while IQueryable is used for out-of-memory collections like databases. IQueryable allows for expression trees to be built and translated to SQL.',
      aiFeedback: 'Good explanation. You correctly identified the core difference. Consider mentioning deferred execution as well.',
      suggestedImprovement: 'Add that both support deferred execution, but IQueryable can translate expressions to SQL for database queries.'
    },
    {
      id: 2,
      question: 'Design a scalable microservices architecture for a ride-sharing app.',
      yourAnswer: 'I would use API Gateway for routing, separate services for user management, ride matching, payment processing, and notifications. Each service would have its own database and communicate via message queues.',
      aiFeedback: 'Excellent approach. You covered the key components. Your understanding of service boundaries is strong.',
      suggestedImprovement: 'Consider adding circuit breakers for fault tolerance and a caching layer for frequently accessed data.'
    },
    {
      id: 3,
      question: 'How would you optimize an Azure Function for cost and performance?',
      yourAnswer: 'I would use consumption plan for cost efficiency, implement caching, minimize package size, and use async/await for I/O operations.',
      aiFeedback: 'Good points, but you missed some key optimization techniques.',
      suggestedImprovement: 'Consider using Premium plan for consistent performance, implement retry policies, and use Application Insights for monitoring.'
    }
  ];
  
  // Mock career path suggestions
  const careerPathSuggestions = [
    {
      id: 1,
      title: 'Retry Interview',
      description: 'Generate new scenario to improve your LLM usage score',
      icon: RotateCcw,
      action: 'Prompt Retry'
    },
    {
      id: 2,
      title: 'Recommended Resources',
      description: 'Curated list to improve your LLM and Azure skills',
      icon: BookOpen,
      action: 'View Resources'
    },
    {
      id: 3,
      title: 'Fit For These Roles',
      description: 'AI-matched suggestions based on your performance',
      icon: Briefcase,
      action: 'See Roles'
    },
    {
      id: 4,
      title: 'Upskill Plan',
      description: 'Personalized learning path to address weak areas',
      icon: TrendingUp,
      action: 'Get Plan'
    }
  ];
  
  // State for expanded transcript items
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  
  // Toggle transcript item expansion
  const toggleExpand = (id: number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(item => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };
  
  // Get status badge
  const getStatusBadge = () => {
    switch (candidate.status) {
      case 'in-review':
        return { text: 'In Review', color: 'bg-blue-500', icon: '🟢' };
      case 'shortlisted':
        return { text: 'Shortlisted', color: 'bg-yellow-500', icon: '🟡' };
      case 'rejected':
        return { text: 'Rejected', color: 'bg-red-500', icon: '🔴' };
      default:
        return { text: 'In Review', color: 'bg-blue-500', icon: '🟢' };
    }
  };
  
  const statusBadge = getStatusBadge();
  
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-gray-900 p-8 gap-6 text-white">
      {/* Welcome Back Card */}
      <motion.div 
        className="flex flex-col items-center gap-4 p-6 bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 text-xl font-bold">
            {candidate.avatar}
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {candidate.name}</h1>
            <p className="text-gray-400">{candidate.role}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Interview Date:</span>
            <span>{candidate.interviewDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${statusBadge.color}`}>
              <span>{statusBadge.icon}</span>
              <span>{statusBadge.text}</span>
            </span>
          </div>
        </div>
      </motion.div>
      
      {/* Interview Summary Snapshot */}
      <motion.div 
        className="rounded-xl bg-gray-800 p-6 shadow-lg w-full max-w-4xl border border-yellow-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-xl font-bold mb-4">Interview Summary Snapshot</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-700/50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-400 mb-1">AI Verdict</div>
            <div className="font-bold text-lg text-yellow-500">{interviewSummary.aiVerdict.label}</div>
            <div className="text-sm">{interviewSummary.aiVerdict.score}/10</div>
          </div>
          
          <div className="bg-gray-700/50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-400 mb-1">Communication</div>
            <div className="font-bold text-lg">{interviewSummary.communication}</div>
          </div>
          
          <div className="bg-gray-700/50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-400 mb-1">System Design</div>
            <div className="font-bold text-lg">{interviewSummary.systemDesign}</div>
          </div>
          
          <div className="bg-gray-700/50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-400 mb-1">LLM Usage</div>
            <div className="font-bold text-lg">{interviewSummary.llmUsage}</div>
          </div>
          
          <div className="bg-gray-700/50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-400 mb-1">Final Score</div>
            <div className="font-bold text-lg">{interviewSummary.finalScore}%</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">AI Summary</div>
          <p className="italic">{aiSummary}</p>
        </div>
      </motion.div>
      
      {/* Transcript + Notes Viewer */}
      <motion.div 
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4">Transcript & Notes</h2>
        
        <div className="space-y-4">
          {transcriptData.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <button 
                className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-700/50 transition-colors"
                onClick={() => toggleExpand(item.id)}
              >
                <span className="font-medium">{item.question}</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${expandedItems.includes(item.id) ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedItems.includes(item.id) && (
                <motion.div 
                  className="p-4 bg-gray-700/30 border-t border-gray-600"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Your Response</div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        {item.yourAnswer}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400 mb-1">AI Feedback</div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        {item.aiFeedback}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Suggested Improvement</div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        {item.suggestedImprovement}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Career Path Suggestions */}
      <motion.div 
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="text-xl font-bold mb-4">Career Path Suggestions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {careerPathSuggestions.map((suggestion) => {
            const IconComponent = suggestion.icon;
            return (
              <div key={suggestion.id} className="bg-gray-800 rounded-xl shadow-lg p-5 hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <IconComponent className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{suggestion.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{suggestion.description}</p>
                    <button className="text-yellow-500 text-sm font-medium flex items-center gap-1 hover:text-yellow-400 transition-colors">
                      {suggestion.action}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
      
      {/* Actions */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <button className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors">
          <Download className="w-5 h-5" />
          <span>Download Feedback PDF</span>
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors">
          <RotateCcw className="w-5 h-5" />
          <span>Ask for Re-Evaluation</span>
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors">
          <Briefcase className="w-5 h-5" />
          <span>Apply Again for New Role</span>
        </button>
      </motion.div>
    </div>
  );
};

export default CenteredHeroPanel;
