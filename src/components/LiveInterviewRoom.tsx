import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  MonitorOff,
  Phone,
  Clock,
  User,
  Bot,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Type,
  X
} from 'lucide-react';

const LiveInterviewRoom = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(3);
  const [totalQuestions] = useState(10);
  const [timer, setTimer] = useState(754); // 12:34 in seconds
  const [showTextInput, setShowTextInput] = useState(false);
  const [textAnswer, setTextAnswer] = useState('');
  const [aiStatus, setAiStatus] = useState('Listening...');
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [liveFeedback, setLiveFeedback] = useState([
    { icon: CheckCircle, text: 'Clear answer structure', type: 'success' },
    { icon: AlertCircle, text: 'Taking a bit long to answer — no worries', type: 'warning' },
    { icon: TrendingUp, text: 'English fluency: 7.5/10', type: 'info' }
  ]);

  const questions = [
    "Tell me about your experience with React and modern JavaScript frameworks.",
    "How do you handle state management in large-scale applications?",
    "Explain your experience with asynchronous programming.",
    "Describe a challenging technical problem you solved recently.",
    "How do you approach code reviews and team collaboration?"
  ];

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // AI status rotation
  useEffect(() => {
    const statuses = [
      'Listening...',
      'Analyzing your response...',
      'Scoring your last answer...',
      'Next question in 5s...',
      'Processing speech patterns...'
    ];
    
    const interval = setInterval(() => {
      setAiStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
      setTextAnswer('');
    } else {
      // Navigate to report when interview is complete
      navigate('/report');
    }
  };

  return (
    <div className="grid grid-cols-[2fr,1fr] h-screen bg-gradient-to-br from-[#0C0C0F] to-[#121212] text-white overflow-hidden">
      {/* Left Panel - Video Interview Zone */}
      <div className="p-6 flex flex-col">
        {/* Main Video Feed */}
        <div className="flex-1 relative rounded-3xl shadow-lg bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden group">
          {/* Video Content */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
            {isCameraOn ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-white/80">You</p>
                </div>
              </div>
            ) : (
              <motion.div 
                className="w-full h-full flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-48 h-48 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                  <User className="w-24 h-24 text-gray-400" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Top Right Controls */}
          <div className="absolute top-4 right-4 flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors ${
                isMuted ? 'bg-red-500/80 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={`w-12 h-12 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors ${
                !isCameraOn ? 'bg-red-500/80 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </motion.button>

            {/* Recording Badge */}
            {isRecording && (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center space-x-2 px-3 py-2 bg-red-500/80 rounded-full backdrop-blur-md"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Recording...</span>
              </motion.div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            {/* Screen Share Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`px-4 py-2 rounded-full backdrop-blur-md border border-white/20 flex items-center space-x-2 transition-colors ${
                isScreenSharing ? 'bg-green-500/80 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isScreenSharing ? <Monitor className="w-4 h-4" /> : <MonitorOff className="w-4 h-4" />}
              <span className="text-sm">{isScreenSharing ? 'Stop Sharing' : 'Share Screen'}</span>
            </motion.button>

            {/* Timer */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-full backdrop-blur-md">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-mono">{formatTime(timer)}</span>
            </div>
          </div>
        </div>

        {/* Floating AI Assistant */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 max-w-xs"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">AI Assistant</div>
              <motion.div
                key={aiStatus}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-gray-300 flex items-center"
              >
                {aiStatus}
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-1"
                >
                  ...
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Question & Guidance */}
      <div className="p-6 flex flex-col space-y-6 border-l border-white/10">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Interview Progress</h2>
          <div className="flex space-x-1">
            {Array.from({ length: totalQuestions }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i < currentQuestion ? 'bg-yellow-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 bg-white/5 border border-white/10 shadow-xl backdrop-blur-md"
        >
          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-2">Question {currentQuestion} of {totalQuestions}</div>
            <h3 className="text-xl font-semibold text-white leading-relaxed">
              {questions[currentQuestion - 1] || "Explain your experience with asynchronous programming."}
            </h3>
          </div>
          <div className="text-xs text-gray-500 italic">
            Generated based on your resume and job role
          </div>
        </motion.div>

        {/* Answer Controls */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMuted(!isMuted)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'
              }`}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span className="text-sm">{isMuted ? 'Mic Off' : 'Mic On'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTextInput(!showTextInput)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors hover:bg-blue-500/30"
            >
              <Type className="w-4 h-4" />
              <span className="text-sm">Type Answer</span>
            </motion.button>
          </div>

          {/* Text Input */}
          <AnimatePresence>
            {showTextInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <textarea
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full h-32 p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 resize-none focus:outline-none focus:border-yellow-400/50 transition-colors"
                />
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-300 transition-colors">
                    Submit Answer
                  </button>
                  <button 
                    onClick={() => setShowTextInput(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Feedback Module */}
        <div className="p-4 bg-white/5 rounded-xl border border-neutral-700">
          <h4 className="text-sm font-medium text-white mb-3">Live AI Feedback</h4>
          <div className="space-y-2">
            {liveFeedback.map((feedback, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 text-xs"
              >
                <feedback.icon className={`w-3 h-3 ${
                  feedback.type === 'success' ? 'text-green-400' :
                  feedback.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                }`} />
                <span className="text-gray-300">{feedback.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex-1 flex flex-col justify-end space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextQuestion}
            disabled={currentQuestion >= totalQuestions}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion >= totalQuestions ? 'Interview Complete' : 'Next Question'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowEndDialog(true)}
            className="w-full py-3 border border-red-500/30 text-red-400 font-semibold rounded-xl hover:bg-red-500/10 transition-colors flex items-center justify-center space-x-2"
          >
            <Phone className="w-4 h-4" />
            <span>End Interview</span>
          </motion.button>
        </div>

        {/* Confidentiality Notice */}
        <div className="text-xs text-gray-500 text-center italic border-t border-white/10 pt-4">
          This interview is confidential. AI is assisting the panel to evaluate your responses.
        </div>
      </div>

      {/* End Interview Dialog */}
      <AnimatePresence>
        {showEndDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 max-w-md mx-4 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-4">End Interview?</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to end the interview? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowEndDialog(false)}
                  className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Continue Interview
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors"
                >
                  End Interview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveInterviewRoom;