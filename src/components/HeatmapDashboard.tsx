import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Download, Share2 } from 'lucide-react';

const HeatmapDashboard = () => {
  // Mock data
  const roles = ['.NET + Azure', 'Gen AI Engineer', 'Frontend Developer', 'DevOps Specialist'];
  const skills = ['C#', 'Azure', 'LLMs', 'DSA', 'System Design', 'Prompt Engineering'];
  
  // Mock candidate data
  const candidates = [
    { id: 1, name: 'John Doe', initials: 'JD', scores: [9.2, 6.8, 7.5, 8.1, 6.3, 4.2] },
    { id: 2, name: 'Jane Smith', initials: 'JS', scores: [7.8, 8.2, 9.1, 6.7, 7.9, 3.8] },
    { id: 3, name: 'Robert Johnson', initials: 'RJ', scores: [8.5, 5.3, 6.9, 9.2, 8.4, 6.1] },
    { id: 4, name: 'Emily Davis', initials: 'ED', scores: [6.2, 7.7, 8.3, 5.8, 6.9, 8.7] },
    { id: 5, name: 'Michael Wilson', initials: 'MW', scores: [9.1, 8.8, 7.2, 7.9, 9.3, 5.4] },
  ];
  
  // Mock weakness data
  const weaknessData = [
    { skill: 'Prompt Engineering', percentage: 70 },
    { skill: 'System Design', percentage: 45 },
    { skill: 'DSA', percentage: 38 },
    { skill: 'LLMs', percentage: 32 },
    { skill: 'Azure', percentage: 28 },
  ];
  
  // Mock trend data
  const trendData = [
    { month: 'Jan', dotNet: 7.2, ai: 6.8 },
    { month: 'Feb', dotNet: 7.5, ai: 7.1 },
    { month: 'Mar', dotNet: 7.8, ai: 7.5 },
    { month: 'Apr', dotNet: 8.1, ai: 7.9 },
    { month: 'May', dotNet: 8.3, ai: 8.2 },
    { month: 'Jun', dotNet: 8.6, ai: 8.7 },
  ];
  
  // State
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [compareWithPrevious, setCompareWithPrevious] = useState(false);
  
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score > 8.5) return 'bg-green-500';
    if (score >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Get weakness bar color
  const getWeaknessColor = (percentage: number) => {
    if (percentage > 60) return 'bg-red-500';
    if (percentage > 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="flex flex-col gap-6 bg-gray-900 p-6 min-h-screen text-white">
      {/* Role Filter + Timeline Picker */}
      <motion.div 
        className="flex flex-wrap items-center gap-4 p-4 bg-gray-800 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">Role:</span>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              {selectedRole}
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Dropdown would go here in a real implementation */}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span>Jun 1 - Jun 30, 2023</span>
        </div>
        
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="compare-toggle" 
            checked={compareWithPrevious}
            onChange={() => setCompareWithPrevious(!compareWithPrevious)}
            className="rounded text-yellow-500 focus:ring-yellow-500"
          />
          <label htmlFor="compare-toggle">Compare with Previous Quarter</label>
        </div>
      </motion.div>
      
      {/* Heatmap Grid */}
      <motion.div 
        className="bg-gray-800 rounded-xl shadow-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-xl font-bold mb-4">Skills vs Candidates Heatmap</h2>
        <div className="grid grid-cols-7 gap-4">
          {/* Header row */}
          <div></div>
          {skills.map((skill, index) => (
            <div key={index} className="font-medium text-center p-2 text-gray-300">{skill}</div>
          ))}
          
          {/* Candidate rows */}
          {candidates.map((candidate) => (
            <React.Fragment key={candidate.id}>
              <div className="flex items-center gap-2 p-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 font-medium">
                  {candidate.initials}
                </div>
                <span className="font-medium">{candidate.name}</span>
              </div>
              {candidate.scores.map((score, scoreIndex) => (
                <div 
                  key={scoreIndex} 
                  className="flex items-center justify-center p-2"
                  title={`${candidate.name} — ${skills[scoreIndex]}: ${score}`}
                >
                  <div className={`w-6 h-6 rounded-full ${getScoreColor(score)} flex items-center justify-center text-white text-xs`}>
                    {score}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Weakness Graph */}
        <motion.div 
          className="bg-gray-800 rounded-xl shadow-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4">Skill Weakness Analysis</h2>
          <div className="space-y-4">
            {weaknessData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.skill}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${getWeaknessColor(item.percentage)}`} 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Skill Fit Trends */}
        <motion.div 
          className="bg-gray-800 rounded-xl shadow-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-4">Skill Fit Trends</h2>
          <div className="h-64 flex items-end gap-2 justify-center pt-8">
            {trendData.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex items-end gap-1 h-40">
                  <div 
                    className="w-4 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors" 
                    style={{ height: `${(data.dotNet / 10) * 100}%` }}
                    title={`.NET Role: ${data.dotNet}`}
                  ></div>
                  <div 
                    className="w-4 bg-purple-500 rounded-t hover:bg-purple-600 transition-colors" 
                    style={{ height: `${(data.ai / 10) * 100}%` }}
                    title={`AI Role: ${data.ai}`}
                  ></div>
                </div>
                <span className="text-sm text-gray-300">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm">.NET Role</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-sm">AI Role</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Recommendations Section */}
      <motion.div 
        className="bg-yellow-900/30 p-4 rounded-xl border-l-4 border-yellow-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-2 text-yellow-500">🎯 Recommendations</h2>
        <p className="text-gray-300">70% of AI Engineer candidates scored &lt;5 in Prompt Engineering. Add more targeted questions or training prompts.</p>
      </motion.div>
      
      {/* Download / Share Panel */}
      <motion.div 
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          Export PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Share2 className="w-4 h-4" />
          Share with Team
        </button>
      </motion.div>
    </div>
  );
};

export default HeatmapDashboard;
