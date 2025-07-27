import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Download, 
  Share2, 
  FileText, 
  Home, 
  RotateCcw, 
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Brain,
  MessageSquare,
  User,
  Globe,
  Award,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostInterviewReport = () => {
  const navigate = useNavigate();
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [confetti, setConfetti] = useState(true);

  // Hide confetti after animation
  useEffect(() => {
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const scores = [
    { 
      icon: Brain, 
      label: 'Technical Knowledge', 
      score: 8.3, 
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30'
    },
    { 
      icon: MessageSquare, 
      label: 'Communication Skills', 
      score: 7.6, 
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-500/30'
    },
    { 
      icon: User, 
      label: 'Confidence Level', 
      score: 8.1, 
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/30'
    },
    { 
      icon: Globe, 
      label: 'English Fluency', 
      score: 7.8, 
      color: 'text-yellow-400',
      bgColor: 'from-yellow-500/20 to-yellow-600/20',
      borderColor: 'border-yellow-500/30'
    }
  ];

  const questions = [
    {
      question: "What are async/await in .NET?",
      score: 8.5,
      feedback: "Strong understanding demonstrated. Good explanation of await keyword and proper usage patterns.",
      tags: ["#Threading", "#AsyncPatterns", "#CSharp"],
      details: "Candidate showed deep knowledge of asynchronous programming concepts, correctly explained the difference between Task and async/await, and provided practical examples."
    },
    {
      question: "Explain your experience with React hooks.",
      score: 7.8,
      feedback: "Solid grasp of useState and useEffect. Could improve on custom hooks explanation.",
      tags: ["#React", "#Hooks", "#JavaScript"],
      details: "Good understanding of basic hooks, demonstrated with clear examples. Some hesitation when discussing advanced patterns like useCallback and useMemo."
    },
    {
      question: "How do you handle state management in large applications?",
      score: 8.2,
      feedback: "Excellent knowledge of Redux and Context API. Clear architectural thinking.",
      tags: ["#StateManagement", "#Redux", "#Architecture"],
      details: "Comprehensive answer covering multiple state management solutions, trade-offs between different approaches, and when to use each pattern."
    },
    {
      question: "Describe your experience with cloud platforms.",
      score: 6.9,
      feedback: "Basic AWS knowledge shown. Azure experience seems limited - area for improvement.",
      tags: ["#Cloud", "#AWS", "#DevOps"],
      details: "Demonstrated familiarity with basic AWS services like EC2 and S3, but showed gaps in more advanced topics like serverless architecture and container orchestration."
    }
  ];

  const overallScore = 8.1;
  const starRating = Math.round(overallScore / 2);

  const CircularProgress = ({ score, size = 80 }: { score: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 10) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-gray-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-yellow-400"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{score}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Confetti Animation */}
      <AnimatePresence>
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 50 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  ease: "linear",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto py-20 px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="rounded-3xl p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl mb-8">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-12 h-12 text-yellow-400 mr-4" />
              <h1 className="text-4xl font-bold text-white">
                Candidate Interview Analyzed by AI
              </h1>
            </div>
            <p className="text-xl text-gray-400">
              Here's a comprehensive breakdown of their performance
            </p>
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                AI Verified ✓
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary Score Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {scores.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 bg-gradient-to-br ${item.bgColor} border ${item.borderColor} shadow-xl backdrop-blur-md hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.label}</h3>
                    <p className="text-gray-400 text-sm">AI Assessment</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${item.color}`}>
                    {item.score}
                  </div>
                  <div className="text-gray-400 text-sm">/ 10</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${item.color.replace('text-', 'from-').replace('-400', '-400')} to-transparent`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score * 10}%` }}
                    transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Detailed Feedback Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <FileText className="w-8 h-8 text-yellow-400 mr-3" />
            Question-by-Question Analysis
          </h2>
          
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-gray-400">Question {index + 1}</span>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-semibold">{q.score}/10</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{q.question}</h3>
                      <p className="text-gray-300 text-sm">{q.feedback}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {q.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4">
                      {expandedQuestions.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {expandedQuestions.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-6 bg-white/5">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Detailed Analysis:</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{q.details}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Analysis Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="rounded-2xl p-8 bg-white/5 border border-white/10 shadow-xl backdrop-blur-md">
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">AI Analysis Summary</h2>
            </div>
            <blockquote className="text-neutral-300 italic text-lg leading-relaxed">
              "The candidate demonstrated a strong foundation in asynchronous programming, effective communication in English, and calm delivery. Slight hesitation on Azure topics may benefit from further review. Overall performance indicates readiness for senior-level responsibilities with some areas for targeted improvement."
            </blockquote>
            <div className="mt-4 text-sm text-gray-500">
              Generated by InterviewBuddee AI • Confidence: 94%
            </div>
          </div>
        </motion.div>

        {/* Overall Rating Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="rounded-2xl p-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <Award className="w-8 h-8 text-yellow-400 mr-3" />
                  AI Interview Scorecard
                </h2>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-4xl font-bold text-yellow-400">{overallScore}</span>
                  <span className="text-gray-400">/ 10</span>
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < starRating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-400">({starRating}/5 stars)</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <CircularProgress score={overallScore} size={120} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interview Panel Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-12"
        >
          <div className="rounded-2xl p-6 bg-white/5 border border-white/10 shadow-xl backdrop-blur-md">
            <h3 className="text-lg font-semibold text-white mb-4">Interview Panel Feedback</h3>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-white">Sarah Chen</span>
                  <span className="text-sm text-gray-400">• Senior Engineering Manager</span>
                </div>
                <blockquote className="text-gray-300 italic">
                  "Would recommend moving to next round – confident and structured thinking. 
                  Strong technical foundation with good communication skills."
                </blockquote>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download & Share Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="flex items-center space-x-2 px-6 py-3 rounded-full bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30 shadow-md transition-all duration-300 hover:scale-105">
              <Download className="w-5 h-5" />
              <span>Download Report as PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 shadow-md transition-all duration-300 hover:scale-105">
              <Share2 className="w-5 h-5" />
              <span>Share with Team</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 rounded-full bg-green-500/20 text-green-300 hover:bg-green-500/30 shadow-md transition-all duration-300 hover:scale-105">
              <FileText className="w-5 h-5" />
              <span>Add Notes for Next Round</span>
            </button>
          </div>
        </motion.div>

        {/* Navigation Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-wrap gap-4 justify-center border-t border-white/10 pt-8"
        >
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full hover:bg-purple-500/30 transition-colors">
            <RotateCcw className="w-5 h-5" />
            <span>Schedule Next Round</span>
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-6 py-3 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
            <span>Close Report</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PostInterviewReport;