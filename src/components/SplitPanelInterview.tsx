import React, { useState, useEffect, useCallback } from 'react';
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
  MessageSquare,
  FileText,
  Play,
  Pause,
  Send,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const SplitPanelInterview = () => {
  // Left Panel States
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const [timer, setTimer] = useState(1725); // 28:45 in seconds
  const [interviewStatus, setInterviewStatus] = useState('Live'); // Live, Paused, Ended
  
  // Right Panel States

  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, { score: number; comment: string }>>({
    'Communication': { score: 4, comment: '' },
    'Problem Solving': { score: 5, comment: '' },
    'Coding Skills': { score: 3, comment: '' },
    'System Design': { score: 4, comment: '' },
    'Cultural Fit': { score: 4, comment: '' }
  });
  const [aiSuggestions] = useState([
    "Candidate mentioned Pub/Sub – suggest asking about Kafka vs RabbitMQ?",
    "Candidate hesitated during async call design – dig deeper?",
    "Suggest feedback: 'Candidate has a strong grasp on distributed caching.'"
  ]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [finalVerdict, setFinalVerdict] = useState('');
  const [manualComments, setManualComments] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  // Chat/Notes States
  const [chatTab, setChatTab] = useState('chat'); // chat, notes
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Interviewer 1', message: 'Good technical depth so far', timestamp: '10:15' },
    { id: 2, sender: 'Interviewer 2', message: 'Agreed, but watch for communication clarity', timestamp: '10:17' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [notes, setNotes] = useState('# Interview Notes\n\n## Strengths\n- Strong technical knowledge\n- Good problem-solving approach\n\n## Areas for Improvement\n- Communication could be clearer\n\n## Key Points\n- Experience with microservices\n- Familiar with cloud platforms');
  
  // Timer effect
  useEffect(() => {
    if (interviewStatus !== 'Live') return;
    
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [interviewStatus]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleSkill = useCallback((skill: string) => {
    setActiveSkill(activeSkill === skill ? null : skill);
  }, [activeSkill]);
  
  const handleScoreChange = (skill: string, score: number) => {
    setScores(prev => ({
      ...prev,
      [skill]: { ...prev[skill], score }
    }));
  };
  
  const handleCommentChange = (skill: string, comment: string) => {
    setScores(prev => ({
      ...prev,
      [skill]: { ...prev[skill], comment }
    }));
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: chatMessages.length + 1,
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMsg]);
    setNewMessage('');
  };
  
  const handleSubmitEvaluation = () => {
    setShowSubmitModal(true);
  };
  
  const confirmSubmit = () => {
    // In a real app, this would send the evaluation data to the server
    console.log('Evaluation submitted:', { scores, finalVerdict, manualComments });
    setShowSubmitModal(false);
    // Redirect to report page
    // navigate('/report');
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + 1-5 for scoring categories
      if (e.ctrlKey && e.key >= '1' && e.key <= '5') {
        const skills = Object.keys(scores);
        const index = parseInt(e.key) - 1;
        if (index < skills.length) {
          toggleSkill(skills[index]);
        }
      }
      
      // Ctrl + Enter to submit
      if (e.ctrlKey && e.key === 'Enter') {
        handleSubmitEvaluation();
      }
      
      // Cmd + Shift + N to open notes
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'N') {
        setChatTab('notes');
      }
      
      // /ai in notes to invoke AI suggestion
      if (e.key === '/' && chatTab === 'notes') {
        // This would be handled in the notes input field
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scores, chatTab, toggleSkill]);
  
  return (
    <div className="flex h-screen w-full bg-[#0E0E0E] text-white">
      {/* Left Panel: Live Interview Section */}
      <div className="bg-[#121212] flex flex-col h-full w-3/5 border-r border-white/10">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 h-16 border-b border-white/10 backdrop-blur-md">
          <div>
            <h2 className="font-semibold">John Doe – Sr. Backend Engineer</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Interview ID: #INT-2023-0045</span>
              <span>•</span>
              <span className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-1 ${interviewStatus === 'Live' ? 'bg-green-500 animate-pulse' : interviewStatus === 'Paused' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
                {interviewStatus}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="font-mono">{formatTime(timer)}</span>
            </div>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setInterviewStatus(interviewStatus === 'Paused' ? 'Live' : 'Paused')}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
              >
                {interviewStatus === 'Paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
              >
                <FileText className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {}}
                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors flex items-center"
              >
                <Phone className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Live Video Feed */}
        <div className="flex-1 relative bg-gradient-to-br from-gray-900/50 to-gray-800/50">
          {/* Video Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isCameraOn ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <User className="w-24 h-24 text-white" />
                  </div>
                  <p className="text-white/80 text-xl">John Doe</p>
                  <p className="text-gray-400 text-sm mt-1">Sr. Backend Engineer</p>
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
            {/* isRecording was removed from state, so this badge is temporarily disabled */}
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
        
        {/* Real-Time Chat + Notes */}
        <div className="h-64 border-t border-white/10 flex flex-col">
          {/* Tab Headers */}
          <div className="flex border-b border-white/10">
            <button 
              className={`px-4 py-3 text-sm font-medium ${chatTab === 'chat' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setChatTab('chat')}
            >
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Interviewer Chat
              </div>
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium ${chatTab === 'notes' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setChatTab('notes')}
            >
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Panel Notes
              </div>
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {chatTab === 'chat' ? (
              <div className="h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">{msg.sender}</span>
                        <span className="text-gray-500 text-xs">{msg.timestamp}</span>
                      </div>
                      <p className="text-gray-300 mt-1">{msg.message}</p>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-white/10 flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400/50 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    className="w-10 h-10 bg-yellow-400 text-black rounded-lg flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                {/* Notes Editor */}
                <div className="flex-1 overflow-y-auto p-4">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-full bg-transparent text-sm resize-none focus:outline-none"
                    placeholder="Write your notes here..."
                  />
                </div>
                
                {/* Notes Actions */}
                <div className="p-4 border-t border-white/10 flex justify-between">
                  <div className="text-xs text-gray-500">
                    Tip: Type /ai to invoke AI suggestions
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-colors"
                    >
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-lg text-xs font-medium transition-colors"
                    >
                      Auto-Save
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Right Panel: Evaluation & AI Assistance */}
      <div className="w-2/5 flex flex-col px-6 py-4 gap-6 bg-[#1A1A1A] overflow-y-auto">
        {/* Section 1: Question Prompt */}
        <motion.div 
          className="rounded-xl p-5 bg-white/5 border border-white/10 backdrop-blur-md"
          whileHover={{ y: -2 }}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg">Active Question</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors"
            >
              Mark as Asked
            </motion.button>
          </div>
          
          <p className="text-gray-200 mb-4">
            Design a microservice architecture for a ride-sharing platform like Uber or Lyft. 
            Consider scalability, fault tolerance, and data consistency.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">System Design</span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">Scalable</span>
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">REST</span>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Microservices</span>
          </div>
          
          <div className="border-t border-white/10 pt-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">AI Suggested Follow-up</h4>
            <p className="text-sm text-gray-300">
              What trade-offs would you consider for async messaging?
            </p>
          </div>
        </motion.div>
        
        {/* Section 2: Scoring Criteria */}
        <div className="rounded-xl p-5 bg-white/5 border border-white/10 backdrop-blur-md">
          <h3 className="font-semibold text-lg mb-4">Scoring Criteria</h3>
          
          <div className="space-y-3">
            {Object.entries(scores).map(([skill, { score, comment }]) => (
              <div key={skill} className="border border-white/10 rounded-lg overflow-hidden">
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  onClick={() => toggleSkill(skill)}
                  className="w-full px-4 py-3 flex justify-between items-center text-left"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="font-medium">{skill}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 font-medium mr-2">{score}/5</span>
                    {activeSkill === skill ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </motion.button>
                
                <AnimatePresence>
                  {activeSkill === skill && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <div className="pt-2">
                        <div className="flex items-center mb-3">
                          <span className="text-sm text-gray-400 mr-3">Score:</span>
                          <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <motion.button
                                key={value}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleScoreChange(skill, value)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                                  value <= score 
                                    ? 'bg-yellow-400 text-black' 
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                              >
                                {value}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <label className="text-sm text-gray-400 block mb-1">Comments:</label>
                          <textarea
                            value={comment}
                            onChange={(e) => handleCommentChange(skill, e.target.value)}
                            placeholder="Add your comments here..."
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400/50 transition-colors"
                            rows={2}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section 3: AI Copilot Zone */}
        <motion.div 
          className="rounded-xl p-5 bg-white/5 border border-white/10 backdrop-blur-md"
          whileHover={{ y: -2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">AI Copilot</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">Real-time insights</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAiEnabled(!aiEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  aiEnabled ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  aiEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </motion.button>
            </div>
          </div>
          
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <motion.div 
                key={index}
                className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex">
                  <Bot className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-300">{suggestion}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors flex items-center"
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              Helpful
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors flex items-center"
            >
              <ThumbsDown className="w-4 h-4 mr-2" />
              Not Relevant
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Insert to Notes
            </motion.button>
          </div>
        </motion.div>
        
        {/* Section 4: Final Verdict */}
        <div className="rounded-xl p-5 bg-white/5 border border-white/10 backdrop-blur-md mt-auto">
          <h3 className="font-semibold text-lg mb-4">Final Verdict</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Recommendation</label>
              <div className="relative">
                <select
                  value={finalVerdict}
                  onChange={(e) => setFinalVerdict(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400/50 transition-colors appearance-none"
                >
                  <option value="">Select recommendation</option>
                  <option value="Strong Hire">Strong Hire</option>
                  <option value="Hire">Hire</option>
                  <option value="Neutral">Neutral</option>
                  <option value="No Hire">No Hire</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 block mb-2">Manual Comments</label>
              <textarea
                value={manualComments}
                onChange={(e) => setManualComments(e.target.value)}
                placeholder="Add any additional comments..."
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400/50 transition-colors"
                rows={3}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitEvaluation}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-300 transition-all flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Evaluation
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 max-w-md mx-4 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-4">Submit Evaluation?</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to submit this evaluation? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmSubmit}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-lg font-medium transition-colors"
                >
                  Confirm Submission
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplitPanelInterview;
