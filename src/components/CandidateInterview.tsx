import { useState, useEffect, useCallback } from 'react';
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
  X,
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react';

const CandidateInterview = () => {
  // Interview states
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [interviewStatus] = useState<'Live' | 'Paused'>('Live');
  const [timer, setTimer] = useState(15 * 60); // 15 minutes in seconds
  const [showAssistant, setShowAssistant] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'good' | 'poor' | 'disconnected'>('good');
  
  // Timer effect
  useEffect(() => {
    if (interviewStatus !== 'Live') return;
    
    const interval = setInterval(() => {
      setTimer(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [interviewStatus]);
  
  // Format time as MM:SS
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);
  
  // Handle leaving interview
  const handleLeaveInterview = () => {
    setShowExitModal(true);
  };
  
  // Confirm leaving interview
  const confirmLeave = () => {
    // In a real app, this would end the interview session
    console.log('Interview ended');
    // Redirect to thank you page or dashboard
    // navigate('/thank-you');
  };
  
  // Network status simulation
  useEffect(() => {
    const networkInterval = setInterval(() => {
      // Randomly change network status for demonstration
      const statuses: Array<'good' | 'poor' | 'disconnected'> = ['good', 'poor', 'disconnected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setNetworkStatus(randomStatus);
    }, 30000); // Change every 30 seconds
    
    return () => clearInterval(networkInterval);
  }, []);
  
  return (
    <div className="flex flex-col h-screen w-full bg-[#FAFAFA] text-[#1A1A1A] overflow-hidden">
      {/* Top Bar: Interview Info */}
      <div className="flex justify-between items-center px-6 h-16 bg-white shadow-sm sticky top-0 z-10">
        <div>
          <h2 className="font-semibold">Sr. .NET Developer – Interview Round 2</h2>
          <p className="text-sm text-gray-600">With: Jane Smith</p>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Timer */}
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="font-mono text-sm font-medium">{formatTime(timer)}</span>
          </div>
          
          {/* Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${interviewStatus === 'Live' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-sm font-medium">{interviewStatus}</span>
          </div>
        </div>
      </div>
      
      {/* Video Panel */}
      <div className="flex justify-center items-center h-[60vh] mt-6 mb-4 px-4 relative">
        {/* Main Video */}
        <div className="relative w-full max-w-4xl h-full rounded-xl overflow-hidden shadow-lg">
          {isCameraOn ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <p className="text-lg font-medium text-gray-800">John Doe</p>
                <p className="text-gray-600">You</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <VideoOff className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Camera Off</p>
              </div>
            </div>
          )}
          
          {/* Network Indicator */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
            {networkStatus === 'good' ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : networkStatus === 'poor' ? (
              <Wifi className="w-4 h-4 text-yellow-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-xs font-medium">
              {networkStatus === 'good' ? 'Good' : networkStatus === 'poor' ? 'Poor' : 'Disconnected'}
            </span>
          </div>
          
          {/* Interviewer Video (Small Overlay) */}
          <div className="absolute top-4 left-4 grid grid-cols-2 gap-2">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-md">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-md">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Controls */}
      <div className="flex justify-center gap-6 py-4 bg-white border-t shadow-inner sticky bottom-0">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMuted(!isMuted)}
          className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all ${
            isMuted 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          <span className="text-xs mt-1">{isMuted ? 'Unmute' : 'Mute'}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCameraOn(!isCameraOn)}
          className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all ${
            !isCameraOn 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          <span className="text-xs mt-1">{isCameraOn ? 'Stop Video' : 'Start Video'}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all ${
            isScreenSharing 
              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isScreenSharing ? <Monitor className="w-5 h-5" /> : <MonitorOff className="w-5 h-5" />}
          <span className="text-xs mt-1">{isScreenSharing ? 'Stop Sharing' : 'Share Screen'}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLeaveInterview}
          className="flex flex-col items-center px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
        >
          <Phone className="w-5 h-5" />
          <span className="text-xs mt-1">Leave</span>
        </motion.button>
      </div>
      
      {/* Smart Assistant Panel */}
      <AnimatePresence>
        {showAssistant && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 w-[300px] bg-white rounded-xl shadow-xl px-4 py-3 z-20"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold flex items-center">
                <span className="mr-2">💡</span> Interview Tips (AI Assistant)
              </h3>
              <button 
                onClick={() => setShowAssistant(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="text-sm space-y-2 mb-3">
              <li>• Be clear and concise — avoid overly complex explanations.</li>
              <li>• You may be asked to explain your architecture decisions — keep examples ready.</li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAssistant(false)}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
            >
              Got it!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Real-time Notes Modal */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Interview Notes</h3>
                <button 
                  onClick={() => setShowNotes(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 mb-4">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes here...\n\nTips:\n/todo - Add a todo item\n/code - Format as code block\n/question - Mark as question"
                  className="w-full h-full min-h-[300px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Auto-saves every 30 seconds
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNotes(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Save
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitModal && (
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
              className="bg-white rounded-2xl p-6 max-w-md mx-4"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Leave Interview?</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to leave the interview? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowExitModal(false)}
                    className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmLeave}
                    className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    Leave Interview
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Welcome Message */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-40">
        <p className="text-sm text-gray-700">
          Welcome, John! We'll begin shortly. Please ensure your camera and mic are working.
        </p>
      </div>
    </div>
  );
};

export default CandidateInterview;
