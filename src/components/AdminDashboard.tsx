import React, { useState } from 'react';
import { Users, FileQuestion, Calendar, BarChart, Settings, Sun, Moon, Bell, LogOut, Home, Plus, Download, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [userTableTab, setUserTableTab] = useState('candidates');

  // Mock data
  const stats = [
    { title: 'Total Users', value: '218', icon: Users, breakdown: 'Interviewers (54), Candidates (164)' },
    { title: 'AI Questions Generated', value: '12,487', icon: FileQuestion, button: 'Manage Bank' },
    { title: 'Interviews Scheduled This Week', value: '44', icon: Calendar, breakdown: 'Today, Upcoming, Completed' },
    { title: 'Interview Success Rate', value: '78%', icon: BarChart, info: 'Moved to next round' }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'questions', label: 'Question Bank', icon: FileQuestion },
    { id: 'schedule', label: 'Interview Schedule', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const userTableData = [
    { name: 'John Doe', email: 'john@example.com', role: 'Candidate', lastInterview: '2023-05-15', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Interviewer', lastInterview: '2023-05-18', status: 'Active' },
    { name: 'Robert Johnson', email: 'robert@example.com', role: 'Candidate', lastInterview: '2023-05-10', status: 'Completed' },
    { name: 'Emily Davis', email: 'emily@example.com', role: 'Candidate', lastInterview: '2023-05-20', status: 'Scheduled' },
    { name: 'Michael Wilson', email: 'michael@example.com', role: 'Interviewer', lastInterview: '2023-05-12', status: 'Active' }
  ];

  const statusColors: Record<string, string> = {
    'Active': 'bg-green-500/20 text-green-400',
    'Completed': 'bg-blue-500/20 text-blue-400',
    'Scheduled': 'bg-yellow-500/20 text-yellow-400'
  };

  return (
    <div className="flex h-screen bg-[#0E0E0E] text-white overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        className="bg-[#111] border-r border-white/10 sticky left-0 top-0 h-full w-72"
        initial={{ x: 0 }}
        animate={{ width: '18rem' }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-8 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <motion.div 
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-bold text-black">IB</span>
            </motion.div>
            <motion.h1 
              className="ml-3 text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              InterviewBuddee
            </motion.h1>
          </div>

          {/* Menu Items */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <motion.li key={item.id}>
                    <motion.button
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-white/10 text-yellow-400 shadow-lg' : 'hover:bg-white/5'}`}
                      onClick={() => setActiveTab(item.id)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-yellow-400' : ''}`} />
                      <motion.span 
                        className="ml-3 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {item.label}
                      </motion.span>
                      {isActive && (
                        <motion.div 
                          className="ml-auto w-2 h-2 bg-yellow-400 rounded-full"
                          layoutId="activeIndicator"
                        />
                      )}
                    </motion.button>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto pt-8 border-t border-white/10">
            <motion.button
              className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="ml-3 font-medium">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </motion.button>
            
            <motion.button
              className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-white/5 transition-all mt-2"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3 font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 flex justify-between items-center px-8 border-b border-white/10 backdrop-blur-lg bg-[#0E0E0E]/80">
          <div>
            <h1 className="text-xl font-bold capitalize">{activeTab.replace('-', ' ')}</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <motion.button 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
            </motion.button>
            
            <motion.button 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center justify-center">
                <span className="font-bold text-black">U</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-400">admin@interviewbuddee.com</p>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg bg-white/5">
                      <Icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    {stat.button && (
                      <motion.button 
                        className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {stat.button}
                      </motion.button>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
                  
                  {stat.breakdown && (
                    <p className="text-xs text-gray-500 mt-3">{stat.breakdown}</p>
                  )}
                  
                  {stat.info && (
                    <p className="text-xs text-gray-500 mt-3">{stat.info}</p>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* User Management Table */}
          <motion.div 
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">User Management</h2>
                <div className="flex space-x-3">
                  <motion.button 
                    className="flex items-center text-sm bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </motion.button>
                  <motion.button 
                    className="flex items-center text-sm bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-3 py-2 rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </motion.button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-white/10 mb-6">
                <button 
                  className={`px-4 py-2 text-sm font-medium ${userTableTab === 'candidates' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setUserTableTab('candidates')}
                >
                  Candidates
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium ${userTableTab === 'interviewers' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setUserTableTab('interviewers')}
                >
                  Interviewers
                </button>
              </div>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Last Interview</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userTableData.map((user, index) => (
                    <motion.tr 
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4 text-gray-400">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-white/10 rounded text-xs">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{user.lastInterview}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[user.status] || 'bg-gray-500/20 text-gray-400'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <motion.button 
                            className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View
                          </motion.button>
                          <motion.button 
                            className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Ban
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-white/10 flex justify-between items-center">
              <p className="text-sm text-gray-400">Showing 1 to 5 of 218 users</p>
              <div className="flex space-x-2">
                <motion.button 
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Previous
                </motion.button>
                <motion.button 
                  className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Question Bank */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Question Bank</h2>
                <motion.button 
                  className="flex items-center text-sm bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-3 py-2 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </motion.button>
              </div>
              
              <div className="space-y-4">
                <div className="flex border-b border-white/10 pb-4">
                  <button className="px-4 py-2 text-sm font-medium text-yellow-400 border-b-2 border-yellow-400">AI-Generated</button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">Manual</button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">Custom</button>
                </div>
                
                <div className="text-center py-8">
                  <FileQuestion className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No questions added yet</p>
                  <motion.button 
                    className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Bulk Import
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            {/* Interview Schedule */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Interview Schedule</h2>
                <motion.button 
                  className="flex items-center text-sm bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-3 py-2 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule
                </motion.button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">John Doe - Frontend Developer</h3>
                    <span className="text-sm text-gray-400">Today, 2:00 PM</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Technical Interview with Sarah Johnson</p>
                  <div className="flex space-x-2">
                    <motion.button 
                      className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reschedule
                    </motion.button>
                    <motion.button 
                      className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button 
                      className="text-xs bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-2 py-1 rounded transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Join
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Emily Davis - Backend Engineer</h3>
                    <span className="text-sm text-gray-400">Tomorrow, 10:30 AM</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">System Design Interview with Michael Chen</p>
                  <div className="flex space-x-2">
                    <motion.button 
                      className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reschedule
                    </motion.button>
                    <motion.button 
                      className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
