import { useState } from 'react';
import { Download, Filter, BarChart2, TrendingUp, MoreHorizontal, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

const ReportsOverview = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('monthly');
  
  // Mock report data
  const reportData = {
    totalInterviews: 124,
    avgCompletionTime: '42 min',
    passRate: 68,
    candidateSatisfaction: 4.7,
    interviewsByRole: [
      { role: 'Software Engineer', count: 42, percentage: 34 },
      { role: 'Product Manager', count: 28, percentage: 23 },
      { role: 'Designer', count: 19, percentage: 15 },
      { role: 'Data Scientist', count: 15, percentage: 12 },
      { role: 'DevOps', count: 12, percentage: 10 },
      { role: 'Other', count: 8, percentage: 6 }
    ],
    interviewsByStatus: [
      { status: 'Scheduled', count: 24, color: 'bg-yellow-500' },
      { status: 'Completed', count: 86, color: 'bg-green-500' },
      { status: 'Cancelled', count: 8, color: 'bg-red-500' },
      { status: 'Rescheduled', count: 6, color: 'bg-blue-500' }
    ],
    performanceTrend: [
      { month: 'Jan', score: 72 },
      { month: 'Feb', score: 68 },
      { month: 'Mar', score: 75 },
      { month: 'Apr', score: 78 },
      { month: 'May', score: 82 }
    ]
  };
  
  // Chart components
  const BarChart = () => (
    <div className="h-64 flex items-end space-x-2 mt-6">
      {reportData.performanceTrend.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <motion.div 
            className="w-full bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg"
            style={{ height: `${item.score}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${item.score}%` }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          />
          <div className="text-gray-400 text-xs mt-2">{item.month}</div>
        </div>
      ))}
    </div>
  );
  
  const PieChartComponent = () => (
    <div className="flex items-center justify-center mt-6">
      <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        {/* Pie chart segments */}
        <div className="absolute inset-0 rounded-full border-8 border-yellow-500 border-t-yellow-500 border-r-yellow-400 border-b-green-500 border-l-blue-500"></div>
        <div className="text-2xl font-bold">68%</div>
        <div className="absolute -bottom-6 text-gray-400 text-sm">Pass Rate</div>
      </div>
    </div>
  );
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold">Reports & Analytics</h2>
          <p className="text-gray-400 text-sm mt-1">Insights and performance metrics</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex border border-white/10 rounded-lg overflow-hidden">
            <select
              className="bg-white/5 border-0 text-white focus:ring-0 pl-3 pr-8 py-2"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          
          <motion.button 
            className="flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </motion.button>
          
          <motion.button 
            className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-4 py-2 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </motion.button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6">
        {['overview', 'performance', 'candidates', 'interviewers'].map((tab) => (
          <motion.button
            key={tab}
            className={`px-4 py-2 text-sm font-medium capitalize ${activeTab === tab ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ y: -2 }}
          >
            {tab}
          </motion.button>
        ))}
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="bg-white/5 rounded-2xl p-6 border border-white/10"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-yellow-500/20">
              <BarChart2 className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-1">{reportData.totalInterviews}</h3>
          <p className="text-gray-400 text-sm">Total Interviews</p>
        </motion.div>
        
        <motion.div 
          className="bg-white/5 rounded-2xl p-6 border border-white/10"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-1">{reportData.avgCompletionTime}</h3>
          <p className="text-gray-400 text-sm">Avg. Completion Time</p>
        </motion.div>
        
        <motion.div 
          className="bg-white/5 rounded-2xl p-6 border border-white/10"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-green-500/20">
              <PieChart className="w-6 h-6 text-green-400" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-1">{reportData.passRate}%</h3>
          <p className="text-gray-400 text-sm">Pass Rate</p>
        </motion.div>
        
        <motion.div 
          className="bg-white/5 rounded-2xl p-6 border border-white/10"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-purple-500/20">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-1">{reportData.candidateSatisfaction}</h3>
          <p className="text-gray-400 text-sm">Candidate Satisfaction</p>
        </motion.div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div 
          className="bg-white/5 rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Performance Trend</h3>
            <motion.button 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>
          <BarChart />
        </motion.div>
        
        <motion.div 
          className="bg-white/5 rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Interview Status Distribution</h3>
            <motion.button 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>
          <PieChartComponent />
        </motion.div>
      </div>
      
      {/* Interviews by Role */}
      <motion.div 
        className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Interviews by Role</h3>
          <motion.button 
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>
        
        <div className="space-y-4">
          {reportData.interviewsByRole.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32 text-gray-400 text-sm">{item.role}</div>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  />
                </div>
              </div>
              <div className="w-16 text-right text-sm">{item.count}</div>
              <div className="w-12 text-right text-sm text-gray-400">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Recent Reports */}
      <motion.div 
        className="bg-white/5 rounded-2xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Recent Reports</h3>
          <motion.button 
            className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
            whileHover={{ x: 5 }}
          >
            View All
          </motion.button>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <div>
                <div className="font-medium">Monthly Interview Report</div>
                <div className="text-gray-400 text-sm">May 2023 Report</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-gray-400 text-sm">12.5 MB</div>
                <motion.button 
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4 text-gray-400" />
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsOverview;
