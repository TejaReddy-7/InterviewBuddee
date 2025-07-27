import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, MapPin, ChevronDown } from 'lucide-react';

const AnalyticsGrid = () => {
  // Mock data
  const kpiData = [
    { title: 'Total Interviews', value: '1,320', icon: '📊', change: '+12% from last month' },
    { title: 'AI-Driven Interviews', value: '920 (70%)', icon: '🤖', change: '+8% from last month' },
    { title: 'Shortlisted', value: '340', icon: '✅', change: '+5% from last month' },
    { title: 'Hired', value: '128', icon: '💼', change: '+3% from last month' },
    { title: 'Avg Interview Score', value: '78.4%', icon: '📈', change: '+2.1% from last month' },
    { title: 'Interview Dropouts', value: '44', icon: '❌', change: '-3% from last month' }
  ];
  
  const roles = ['.NET Developer', 'GenAI Engineer', 'Fullstack Dev', 'DevOps Specialist', 'Data Scientist'];
  
  // State
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [aiMode, setAiMode] = useState('Hybrid');
  
  // Mock funnel data
  const funnelData = [
    { stage: 'Applied', count: 2450, percentage: 100 },
    { stage: 'Interviewed', count: 1320, percentage: 54 },
    { stage: 'Shortlisted', count: 340, percentage: 14 },
    { stage: 'Hired', count: 128, percentage: 5 }
  ];
  
  const aiAgreementData = [
    { name: 'Jan', aiHumanAgreement: 82, tokenUsage: 1200 },
    { name: 'Feb', aiHumanAgreement: 85, tokenUsage: 1100 },
    { name: 'Mar', aiHumanAgreement: 88, tokenUsage: 1300 },
    { name: 'Apr', aiHumanAgreement: 90, tokenUsage: 1250 },
    { name: 'May', aiHumanAgreement: 92, tokenUsage: 1150 },
    { name: 'Jun', aiHumanAgreement: 91, tokenUsage: 1280 }
  ];
  
  // Mock role-based performance data
  const rolePerformanceData = [
    { role: '.NET Developer', avgScore: 83, hires: 45, dropRate: 5, aiAccuracy: 92 },
    { role: 'GenAI Engineer', avgScore: 79, hires: 32, dropRate: 6, aiAccuracy: 88 },
    { role: 'Fullstack Dev', avgScore: 76, hires: 51, dropRate: 4, aiAccuracy: 95 },
    { role: 'DevOps Specialist', avgScore: 81, hires: 28, dropRate: 3, aiAccuracy: 89 },
    { role: 'Data Scientist', avgScore: 85, hires: 37, dropRate: 7, aiAccuracy: 91 }
  ];
  
  // Mock heatmap data
  const heatmapData = [
    { city: 'San Francisco', count: 120, avgScore: 82 },
    { city: 'New York', count: 95, avgScore: 78 },
    { city: 'London', count: 87, avgScore: 85 },
    { city: 'Bangalore', count: 210, avgScore: 76 },
    { city: 'Berlin', count: 65, avgScore: 88 }
  ];
  
  // Get color based on value
  const getScoreColor = (value: number) => {
    if (value >= 90) return 'bg-green-100 text-green-800';
    if (value >= 80) return 'bg-blue-100 text-blue-800';
    if (value >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  
  return (
    <div className="flex flex-col w-full h-screen bg-gray-900 text-white p-8 gap-6 overflow-y-auto">
      {/* Top Metrics (KPI Cards Grid) */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-lg hover:bg-gray-700/50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-3xl mb-2">{kpi.icon}</div>
                <h3 className="text-gray-400 text-sm font-medium">{kpi.title}</h3>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">{kpi.change}</p>
          </div>
        ))}
      </motion.div>
      
      {/* Time Filter Bar (Sticky) */}
      <motion.div 
        className="sticky top-0 z-10 bg-gray-900 py-4 border-b border-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span>Jun 1 - Jun 30, 2023</span>
          </div>
          
          <div className="relative">
            <select 
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none pr-10"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="All Roles">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
            {['Hybrid', 'Auto', 'Manual'].map((mode) => (
              <button
                key={mode}
                className={`px-3 py-1 rounded text-sm ${aiMode === mode ? 'bg-yellow-500 text-gray-900' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setAiMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2 ml-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>CSV</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interview Funnel Chart */}
        <motion.div 
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4">Interview Funnel</h2>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{stage.stage}</span>
                  <span>{stage.count} ({stage.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className="h-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600" 
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* AI Performance Overview */}
        <motion.div 
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-4">AI Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Verdict Success Rate</h3>
              <div className="flex items-center justify-center h-40">
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                  <div className="absolute w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-2xl font-bold">87%</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">AI vs Human Agreement</h3>
              <div className="space-y-4">
                {aiAgreementData.slice(-3).map((data, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{data.name}</span>
                      <span>{data.aiHumanAgreement}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" 
                        style={{ width: `${data.aiHumanAgreement}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Role-Based Performance Table */}
      <motion.div 
        className="bg-gray-800 rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-4">Role-Based Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium">Role</th>
                <th className="text-left py-3 px-4 font-medium">Avg Score</th>
                <th className="text-left py-3 px-4 font-medium">Hires</th>
                <th className="text-left py-3 px-4 font-medium">Drop Rate</th>
                <th className="text-left py-3 px-4 font-medium">AI Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {rolePerformanceData.map((role, index) => (
                <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3 px-4">{role.role}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getScoreColor(role.avgScore)}`}>
                      {role.avgScore}%
                    </span>
                  </td>
                  <td className="py-3 px-4">{role.hires}</td>
                  <td className="py-3 px-4">{role.dropRate}%</td>
                  <td className="py-3 px-4">
                    <span className="text-green-500">{role.aiAccuracy}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      {/* Global Heatmap */}
      <motion.div 
        className="bg-gray-800 rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Global Candidate Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {heatmapData.map((location, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{location.city}</span>
              </div>
              <div className="text-sm text-gray-400">
                <div>Candidates: {location.count}</div>
                <div>Avg Score: {location.avgScore}%</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsGrid;
