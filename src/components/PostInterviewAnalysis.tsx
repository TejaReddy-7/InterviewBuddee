import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Calendar, 
  Check, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  FileText
} from 'lucide-react';

const PostInterviewAnalysis = () => {
  // State for the initial verdict
  const [verdict, setVerdict] = useState('Shortlist');
  const [verdictNote, setVerdictNote] = useState('');
  const [showAINotes, setShowAINotes] = useState(false);
  
  // Mock data for skills scoring
  const skills = [
    { name: 'C#', score: 8.5, description: 'Above average depth' },
    { name: '.NET Core', score: 8.0, description: 'Strong proficiency' },
    { name: 'Azure', score: 7.5, description: 'Good understanding' },
    { name: 'System Design', score: 9.0, description: 'Excellent clarity' },
    { name: 'Problem Solving', score: 8.2, description: 'Logical approach' },
    { name: 'Communication', score: 6.5, description: 'Less concise under pressure' },
  ];
  
  // Mock data for heatmap
  const heatmapData = [
    { skill: 'C#', score: 8.5 },
    { skill: '.NET Core', score: 8.0 },
    { skill: 'Azure', score: 7.5 },
    { skill: 'System Design', score: 9.0 },
    { skill: 'Problem Solving', score: 8.2 },
    { skill: 'Communication', score: 6.5 },
  ];
  
  // Function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Function to get width based on score
  const getScoreWidth = (score: number) => {
    return `${(score / 10) * 100}%`;
  };
  
  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#F9F9F6] text-[#1A1A1A] p-6 gap-6 overflow-auto">
      {/* Left Panel: Interview Summary */}
      <div className="flex flex-col bg-white shadow-xl rounded-2xl p-6 w-full md:w-2/3">
        {/* Candidate Info Block */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Interview Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Name</p>
              <p className="font-semibold">John Doe</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Role</p>
              <p className="font-semibold">Sr. Backend Developer (.NET)</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Interview Date</p>
              <p className="font-semibold">26 July 2025</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Duration</p>
              <p className="font-semibold">52 mins</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Recorded</p>
              <p className="font-semibold text-green-600">✅ Yes <a href="#" className="text-blue-500 text-sm ml-2">View playback</a></p>
            </div>
          </div>
        </div>
        
        {/* Outcome Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Initial Verdict</label>
          <div className="relative">
            <select
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm appearance-none"
            >
              <option value="Shortlist">Shortlist</option>
              <option value="Hold">Hold</option>
              <option value="Reject">Reject</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="mt-3">
            <textarea
              value={verdictNote}
              onChange={(e) => setVerdictNote(e.target.value)}
              placeholder="Add optional note (markdown enabled)"
              className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
            />
          </div>
        </div>
        
        {/* AI Summary Box */}
        <div className="bg-[#FFF9EB] border-l-4 border-yellow-400 p-4 rounded-xl mt-4">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <span className="mr-2">🧠</span> AI Summary
          </h3>
          <p className="text-gray-700">
            <strong>Candidate demonstrated strong system design clarity and excellent communication.</strong> Areas to probe further: hands-on .NET optimization patterns.
          </p>
        </div>
      </div>
      
      {/* Right Panel: AI Insights & Heatmaps */}
      <div className="flex flex-col gap-4 w-full md:w-1/3">
        {/* Skill Scoring (Glass Cards) */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Skill Scoring</h3>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-4 shadow-sm"
              >
                <h4 className="font-medium text-gray-800 mb-2">{skill.name}</h4>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-gray-900">{skill.score}<span className="text-sm text-gray-500">/10</span></span>
                </div>
                <p className="text-xs text-gray-600 mt-2">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Heatmap Summary */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Performance Heatmap</h3>
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-4 shadow-sm">
            <div className="space-y-3">
              {heatmapData.map((item, index) => (
                <div key={index} className="flex items-center group">
                  <div className="w-24 text-xs text-gray-600 truncate">{item.skill}</div>
                  <div className="flex-1 ml-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${getScoreColor(item.score)} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: getScoreWidth(item.score) }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                  <div className="w-10 text-right text-xs font-medium text-gray-700 ml-2">
                    {item.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* AI Notes */}
        <div>
          <button 
            onClick={() => setShowAINotes(!showAINotes)}
            className="flex items-center justify-between w-full bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-4 shadow-sm"
          >
            <span className="font-semibold flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              View AI Generated Detailed Notes
            </span>
            {showAINotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {showAINotes && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-4 shadow-sm mt-2"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Technical Observations</h4>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                    <li>Strong understanding of .NET Core middleware pipeline</li>
                    <li>Good knowledge of Azure services, especially Functions and Storage</li>
                    <li>Needs to demonstrate more experience with performance optimization</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Behavioral Assessment</h4>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                    <li>STAR format used effectively in most responses</li>
                    <li>Shows good leadership potential in team scenarios</li>
                    <li>Could improve on handling interruptions gracefully</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Follow-up Suggestions</h4>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                    <li>Ask about specific .NET optimization techniques used</li>
                    <li>Probe deeper into Azure cost optimization strategies</li>
                    <li>Scenario: "How would you handle a production outage?"</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Action Bar (Sticky Bottom) */}
      <div className="flex justify-between bg-white p-4 rounded-xl shadow-inner sticky bottom-0 mt-6">
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Next Round
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Summary PDF
          </motion.button>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Re-evaluate with AI
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Check className="w-4 h-4 mr-2" />
            Save & Close
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PostInterviewAnalysis;
