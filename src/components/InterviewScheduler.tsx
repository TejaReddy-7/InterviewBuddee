import React, { useState } from 'react';
import { Calendar, List, Plus, Search, Filter, Clock, User, Video, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const InterviewScheduler = () => {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock interview data
  const interviews = [
    { id: 1, candidate: 'John Doe', role: 'Sr. Backend Developer', date: '2023-05-15', time: '10:00 AM', duration: 60, interviewer: 'Sarah Johnson', status: 'Scheduled' },
    { id: 2, candidate: 'Jane Smith', role: 'Frontend Engineer', date: '2023-05-15', time: '2:30 PM', duration: 45, interviewer: 'Michael Brown', status: 'Scheduled' },
    { id: 3, candidate: 'Robert Johnson', role: 'DevOps Specialist', date: '2023-05-16', time: '11:00 AM', duration: 60, interviewer: 'Emily Davis', status: 'Scheduled' },
    { id: 4, candidate: 'Emily Davis', role: 'Product Manager', date: '2023-05-17', time: '9:00 AM', duration: 90, interviewer: 'David Wilson', status: 'Scheduled' },
    { id: 5, candidate: 'Michael Wilson', role: 'UX Designer', date: '2023-05-17', time: '3:00 PM', duration: 45, interviewer: 'Lisa Anderson', status: 'Scheduled' },
    { id: 6, candidate: 'Sarah Brown', role: 'Data Scientist', date: '2023-05-18', time: '1:00 PM', duration: 60, interviewer: 'James Taylor', status: 'Scheduled' },
  ];
  
  // Filter interviews based on search term
  const filteredInterviews = interviews.filter(interview => 
    interview.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group interviews by date for calendar view
  const groupedInterviews = filteredInterviews.reduce((acc: any, interview) => {
    if (!acc[interview.date]) {
      acc[interview.date] = [];
    }
    acc[interview.date].push(interview);
    return acc;
  }, {});
  
  // Status badge styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-yellow-500/20 text-yellow-400';
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'Cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  // Generate calendar days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // Days from previous month to show
    const prevMonthDays = firstDay.getDay();
    // Days from next month to show
    const nextMonthDays = 6 - lastDay.getDay();
    
    const days = [];
    
    // Previous month days
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date,
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true
      });
    }
    
    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  // Format date as "Month YYYY"
  const formatMonthYear = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };
  
  // Format date as "D"
  const formatDay = (date: Date) => {
    return date.getDate();
  };
  
  // Check if a date has interviews
  const hasInterviews = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return groupedInterviews[dateString] && groupedInterviews[dateString].length > 0;
  };
  
  // Get interviews for a specific date
  const getIntervalsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return groupedInterviews[dateString] || [];
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold">Interview Schedule</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your upcoming interviews</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex border border-white/10 rounded-lg overflow-hidden">
            <motion.button 
              className={`px-3 py-2 ${view === 'calendar' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-gray-400'}`}
              whileHover={{ y: -2 }}
              onClick={() => setView('calendar')}
            >
              <Calendar className="w-4 h-4" />
            </motion.button>
            <motion.button 
              className={`px-3 py-2 ${view === 'list' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-gray-400'}`}
              whileHover={{ y: -2 }}
              onClick={() => setView('list')}
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search interviews..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <motion.button 
            className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-4 py-2 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule
          </motion.button>
        </div>
      </div>
      
      {/* Calendar View */}
      {view === 'calendar' && (
        <div>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">{formatMonthYear(currentDate)}</h3>
            <div className="flex space-x-2">
              <motion.button 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevMonth}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </motion.button>
              <motion.button 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextMonth}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-gray-400 text-sm py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {getCalendarDays().map((dayObj, index) => {
              const hasInterview = hasInterviews(dayObj.date);
              return (
                <motion.div 
                  key={index}
                  className={`min-h-24 p-2 border rounded-lg ${dayObj.isCurrentMonth ? 'bg-white/5 border-white/10' : 'bg-black/20 border-black/30 text-gray-600'} ${hasInterview ? 'border-yellow-400/30' : ''}`}
                  whileHover={{ backgroundColor: dayObj.isCurrentMonth ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.3)' }}
                >
                  <div className={`text-right ${dayObj.isCurrentMonth ? 'text-white' : ''}`}>
                    {formatDay(dayObj.date)}
                  </div>
                  <div className="mt-1 space-y-1">
                    {getIntervalsForDate(dayObj.date).slice(0, 3).map((interview: any) => (
                      <div key={interview.id} className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded truncate">
                        {interview.time}
                      </div>
                    ))}
                    {getIntervalsForDate(dayObj.date).length > 3 && (
                      <div className="text-xs text-gray-400 px-2 py-1">
                        +{getIntervalsForDate(dayObj.date).length - 3} more
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* List View */}
      {view === 'list' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                <th className="pb-4 font-medium">Candidate</th>
                <th className="pb-4 font-medium">Role</th>
                <th className="pb-4 font-medium">Date & Time</th>
                <th className="pb-4 font-medium">Interviewer</th>
                <th className="pb-4 font-medium">Duration</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterviews.map((interview, index) => (
                <motion.tr 
                  key={interview.id} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center justify-center text-black font-bold text-xs mr-3">
                        {interview.candidate.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{interview.candidate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="font-medium">{interview.role}</div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div>{interview.date}</div>
                        <div className="text-gray-400 text-sm">{interview.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <div>{interview.interviewer}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <Video className="w-4 h-4 text-gray-400 mr-2" />
                      <div>{interview.duration} min</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(interview.status)}`}>
                      {interview.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <motion.button 
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
        <p className="text-gray-400 text-sm">Showing 1 to {filteredInterviews.length} of {filteredInterviews.length} results</p>
        <div className="flex space-x-2">
          <motion.button 
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>
          <motion.button 
            className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-lg text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            1
          </motion.button>
          <motion.button 
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;
