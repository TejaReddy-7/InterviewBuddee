import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Download, MoreHorizontal, CheckCircle, Clock, XCircle } from 'lucide-react';

const SmartGridDashboard = () => {
  // Mock data for interviews
  const [interviews] = useState([
    {
      id: 1,
      date: '2023-06-15',
      candidateName: 'Alex Johnson',
      role: '.NET Developer',
      aiVerdict: 'High Fit',
      aiScore: 92,
      humanVerdict: 'Shortlisted',
      duration: '45 min',
      status: 'Shortlisted'
    },
    {
      id: 2,
      date: '2023-06-14',
      candidateName: 'Maria Garcia',
      role: 'AI Architect',
      aiVerdict: 'Medium Fit',
      aiScore: 78,
      humanVerdict: 'Awaiting',
      duration: '38 min',
      status: 'Awaiting'
    },
    {
      id: 3,
      date: '2023-06-12',
      candidateName: 'David Smith',
      role: '.NET + Azure',
      aiVerdict: 'Low Fit',
      aiScore: 65,
      humanVerdict: 'Rejected',
      duration: '52 min',
      status: 'Rejected'
    },
    {
      id: 4,
      date: '2023-06-10',
      candidateName: 'Sarah Williams',
      role: 'AI Developer',
      aiVerdict: 'High Fit',
      aiScore: 95,
      humanVerdict: 'Shortlisted',
      duration: '41 min',
      status: 'Shortlisted'
    }
  ]);

  // Filter states
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedVerdict, setSelectedVerdict] = useState('');
  
  // Unique roles, statuses, and verdicts for filter chips
  const roles = [...new Set(interviews.map(interview => interview.role))];
  const statuses = [...new Set(interviews.map(interview => interview.status))];
  const verdicts = [...new Set(interviews.map(interview => interview.aiVerdict))];

  // Filter interviews based on selected filters
  const filteredInterviews = interviews.filter(interview => {
    return (
      (selectedRole === '' || interview.role === selectedRole) &&
      (selectedStatus === '' || interview.status === selectedStatus) &&
      (selectedVerdict === '' || interview.aiVerdict === selectedVerdict)
    );
  });

  // Get status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-green-100 text-green-800';
      case 'Awaiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get AI verdict badge styling
  const getVerdictBadgeClass = (verdict: string) => {
    switch (verdict) {
      case 'High Fit':
        return 'bg-green-100 text-green-800';
      case 'Medium Fit':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low Fit':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-900 p-6 text-white gap-6">
      {/* Sticky Filters Section */}
      <motion.div 
        className="flex flex-wrap gap-4 items-center sticky top-0 bg-gray-900 z-10 pb-4 border-b border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-bold mr-4">Filters</h2>
        
        {/* Role Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="font-medium self-center mr-2">Role:</span>
          <button 
            onClick={() => setSelectedRole('')}
            className={`px-3 py-1 rounded-full text-sm ${selectedRole === '' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
          >
            All
          </button>
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1 rounded-full text-sm ${selectedRole === role ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            >
              {role}
            </button>
          ))}
        </div>
        
        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="font-medium self-center mr-2">Status:</span>
          <button 
            onClick={() => setSelectedStatus('')}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${selectedStatus === '' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
          >
            All
          </button>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1 rounded-full text-sm flex items-center ${selectedStatus === status ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            >
              {status === 'Shortlisted' && <CheckCircle className="w-4 h-4 mr-1" />}
              {status === 'Awaiting' && <Clock className="w-4 h-4 mr-1" />}
              {status === 'Rejected' && <XCircle className="w-4 h-4 mr-1" />}
              {status}
            </button>
          ))}
        </div>
        
        {/* AI Verdict Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="font-medium self-center mr-2">AI Verdict:</span>
          <button 
            onClick={() => setSelectedVerdict('')}
            className={`px-3 py-1 rounded-full text-sm ${selectedVerdict === '' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
          >
            All
          </button>
          {verdicts.map((verdict) => (
            <button
              key={verdict}
              onClick={() => setSelectedVerdict(verdict)}
              className={`px-3 py-1 rounded-full text-sm ${selectedVerdict === verdict ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            >
              {verdict}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Insights Section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-2">📊 Avg Interview Score</h3>
          <p className="text-2xl font-bold text-yellow-500">7.3</p>
        </div>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-2">🧑‍💼 Top Role in Demand</h3>
          <p className="text-2xl font-bold text-yellow-500">AI Dev</p>
        </div>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-2">🧠 AI Alignment %</h3>
          <p className="text-2xl font-bold text-yellow-500">82%</p>
        </div>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-2">✅ Shortlist Rate</h3>
          <p className="text-2xl font-bold text-yellow-500">64%</p>
        </div>
      </motion.div>

      {/* Interview Table */}
      <motion.div 
        className="rounded-xl shadow-lg overflow-x-auto bg-gray-800 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">📅 Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">👤 Candidate Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">🧑‍💻 Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">🧠 AI Verdict</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">📝 Human Verdict</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">📹 Recording</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">⏱️ Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">🧾 Download</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredInterviews.map((interview) => (
              <motion.tr 
                key={interview.id} 
                className="hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{interview.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{interview.candidateName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{interview.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getVerdictBadgeClass(interview.aiVerdict)}`}>
                    {interview.aiVerdict}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(interview.status)}`}>
                    {interview.humanVerdict}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500">
                  <button className="text-yellow-500 hover:text-yellow-400 flex items-center">
                    <Play className="w-4 h-4 mr-1" />
                    Play
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{interview.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500">
                  <button className="text-yellow-500 hover:text-yellow-400 flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button className="text-gray-400 hover:text-gray-300">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Export Options */}
      <motion.div 
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <button className="px-4 py-2 bg-yellow-600 text-gray-900 rounded-lg hover:bg-yellow-700 transition-colors font-medium">
          Export All
        </button>
        <button className="px-4 py-2 bg-yellow-600 text-gray-900 rounded-lg hover:bg-yellow-700 transition-colors font-medium">
          Filter-based Export
        </button>
        <button className="px-4 py-2 bg-yellow-600 text-gray-900 rounded-lg hover:bg-yellow-700 transition-colors font-medium">
          Send to HR
        </button>
      </motion.div>
    </div>
  );
};

export default SmartGridDashboard;
