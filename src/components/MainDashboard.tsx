import React, { useState } from 'react';
import { Users, FileQuestion, Calendar, BarChart, Settings, Sun, Moon, Bell, LogOut, Home, Plus, Filter, User, Video, FileText, Grid, Activity, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import UserManagement from './UserManagement';
import QuestionBank from './QuestionBank';
import InterviewScheduler from './InterviewScheduler';
import ReportsOverview from './ReportsOverview';
import SettingsPanel from './SettingsPanel';
import SmartGridDashboard from './SmartGridDashboard';
import HeatmapDashboard from './HeatmapDashboard';
import TabbedSmartPanel from './TabbedSmartPanel';
import CenteredHeroPanel from './CenteredHeroPanel';
import AnalyticsGrid from './AnalyticsGrid';
import StepperWizard from './StepperWizard';
import ImmersiveSimulator from './ImmersiveSimulator';
import CandidateMatcher from './CandidateMatcher';

const MainDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);

  // Menu items for the sidebar
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'questions', label: 'Question Bank', icon: FileQuestion },
    { id: 'schedule', label: 'Interview Schedule', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: BarChart },
    { id: 'past-interviews', label: 'Past Interviews', icon: FileText },
    { id: 'smart-grid', label: 'Smart Grid Dashboard', icon: Grid },
    { id: 'heatmap', label: 'Heatmap Dashboard', icon: Activity },
    { id: 'ai-config', label: 'AI Configuration', icon: Settings },
    { id: 'candidate-feedback', label: 'Candidate Feedback', icon: User },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'interview-builder', label: 'Interview Builder', icon: Plus },
    { id: 'candidate-matcher', label: 'Candidate Matcher', icon: User },
    { id: 'simulator', label: 'Interview Simulator', icon: Play },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Mock data for dashboard stats
  const stats = [
    { title: 'Active Interviews', value: '12', icon: Video, change: '+3 from yesterday' },
    { title: 'Pending Reviews', value: '8', icon: FileText, change: '+2 from yesterday' },
    { title: 'Upcoming Interviews', value: '15', icon: Calendar, change: 'Today' },
    { title: 'New Candidates', value: '24', icon: User, change: '+5 from this week' }
  ];

  // Mock data for recent interviews
  const recentInterviews = [
    { id: 1, candidate: 'John Doe', role: 'Sr. Backend Developer', time: 'Today, 2:00 PM', status: 'Completed' },
    { id: 2, candidate: 'Jane Smith', role: 'Frontend Engineer', time: 'Today, 3:30 PM', status: 'Scheduled' },
    { id: 3, candidate: 'Robert Johnson', role: 'DevOps Specialist', time: 'Tomorrow, 10:00 AM', status: 'Scheduled' },
    { id: 4, candidate: 'Emily Davis', role: 'Product Manager', time: 'Tomorrow, 1:45 PM', status: 'Scheduled' }
  ];

  // Status colors
  const statusColors: Record<string, string> = {
    'Completed': 'bg-green-500/20 text-green-400',
    'Scheduled': 'bg-yellow-500/20 text-yellow-400',
    'In Progress': 'bg-blue-500/20 text-blue-400'
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        className="w-64 border-r border-white/10 bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col max-md:hidden"
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    className={`flex items-center w-full p-3 rounded-lg text-left transition-all ${activeTab === item.id ? 'bg-yellow-500/20 text-yellow-400' : 'hover:bg-white/5'}`}
                    onClick={() => setActiveTab(item.id)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                    </motion.div>
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto pt-8 border-t border-white/10">
            <motion.button
              className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
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
              whileTap={{ scale: 0.95 }}
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
        <header className="h-16 flex justify-between items-center px-4 md:px-8 border-b border-white/10 backdrop-blur-lg bg-[#0E0E0E]/80">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button 
              className="md:hidden mr-4 p-2 rounded-lg hover:bg-white/10"
              onClick={() => {
                // Mobile menu toggle functionality would go here
              }}
            >
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className="block w-full h-0.5 bg-white"></span>
                <span className="block w-full h-0.5 bg-white"></span>
                <span className="block w-full h-0.5 bg-white"></span>
              </div>
            </button>
            <h1 className="text-lg md:text-xl font-bold capitalize">{activeTab.replace('-', ' ')}</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <motion.button 
              className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                boxShadow: ["0 0 0 0 rgba(255, 255, 255, 0.1)", "0 0 0 4px rgba(255, 255, 255, 0.1)", "0 0 0 0 rgba(255, 255, 255, 0.1)"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>
            
            <motion.button 
              className="p-2 rounded-full hover:bg-white/10 transition-colors ml-2"
              whileHover={{ scale: 1.1, rotate: 20 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                // Theme toggle functionality would go here
              }}
            >
              <Sun className="w-5 h-5" />
            </motion.button>
            
            <motion.button 
              className="flex items-center ml-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              whileFocus={{ scale: 1.1 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 flex items-center justify-center text-black font-bold"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                JD
              </motion.div>
            </motion.button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && (
            <>
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
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                      <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
                      <p className="text-xs text-gray-500">{stat.change}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Interviews */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="p-6 border-b border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Recent Interviews</h2>
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
                        Schedule
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {recentInterviews.map((interview) => (
                      <div key={interview.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium">{interview.candidate} - {interview.role}</h3>
                          <span className="text-sm text-gray-400">{interview.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[interview.status]}`}>
                            {interview.status}
                          </span>
                          <div className="flex space-x-2">
                            <motion.button 
                              className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              View Details
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
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-white/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="font-bold text-lg mb-4">Interview Tools</h3>
                  <div className="space-y-3">
                    <motion.button 
                      className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center">
                        <Video className="w-5 h-5 text-yellow-400 mr-3" />
                        <span>Start New Interview</span>
                      </div>
                    </motion.button>
                    <motion.button 
                      className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-yellow-400 mr-3" />
                        <span>Post-Interview Analysis</span>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-white/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="font-bold text-lg mb-4">Candidate Tools</h3>
                  <div className="space-y-3">
                    <motion.button 
                      className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-yellow-400 mr-3" />
                        <span>Candidate Portal</span>
                      </div>
                    </motion.button>
                    <motion.button 
                      className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-yellow-400 mr-3" />
                        <span>Feedback Reports</span>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-white/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="font-bold text-lg mb-4">Admin Tools</h3>
                  <div className="space-y-3">
                    <motion.button 
                      className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-yellow-400 mr-3" />
                        <span>User Management</span>
                      </div>
                    </motion.button>
                    <motion.button 
                      className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center">
                        <Settings className="w-5 h-5 text-yellow-400 mr-3" />
                        <span>System Settings</span>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
          
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'questions' && <QuestionBank />}
          {activeTab === 'schedule' && <InterviewScheduler />}
          {activeTab === 'reports' && <ReportsOverview />}
          {activeTab === 'smart-grid' && <SmartGridDashboard />}
          {activeTab === 'heatmap' && <HeatmapDashboard />}
          {activeTab === 'ai-config' && <TabbedSmartPanel />}
          {activeTab === 'candidate-feedback' && <CenteredHeroPanel />}
          {activeTab === 'analytics' && <AnalyticsGrid />}
          {activeTab === 'interview-builder' && <StepperWizard />}
          {activeTab === 'candidate-matcher' && (
            <div className="h-full overflow-auto">
              <CandidateMatcher />
            </div>
          )}
          {activeTab === 'simulator' && <ImmersiveSimulator />}
          {activeTab === 'settings' && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
