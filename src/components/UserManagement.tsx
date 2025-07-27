import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-05-15', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Interviewer', status: 'Active', lastLogin: '2023-05-14', avatar: 'JS' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Candidate', status: 'Pending', lastLogin: '2023-05-10', avatar: 'RJ' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Interviewer', status: 'Active', lastLogin: '2023-05-12', avatar: 'ED' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Candidate', status: 'Inactive', lastLogin: '2023-04-28', avatar: 'MW' },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-05-15', avatar: 'SB' },
  ];
  
  // Filter users based on active tab and search term
  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && user.status === 'Active') ||
                      (activeTab === 'pending' && user.status === 'Pending') ||
                      (activeTab === 'inactive' && user.status === 'Inactive');
    
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  // Status badge styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'Inactive': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold">User Management</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your team members and candidates</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
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
            Add User
          </motion.button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6">
        {['all', 'active', 'pending', 'inactive'].map((tab) => (
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
      
      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm border-b border-white/10">
              <th className="pb-4 font-medium">User</th>
              <th className="pb-4 font-medium">Role</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Last Login</th>
              <th className="pb-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <motion.tr 
                key={user.id} 
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center justify-center text-black font-bold mr-3">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-gray-400 text-sm">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="px-2 py-1 bg-white/10 rounded text-xs">{user.role}</span>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 text-gray-400 text-sm">{user.lastLogin}</td>
                <td className="py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <motion.button 
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-4 h-4 text-gray-400" />
                    </motion.button>
                    <motion.button 
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit className="w-4 h-4 text-gray-400" />
                    </motion.button>
                    <motion.button 
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </motion.button>
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
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
        <p className="text-gray-400 text-sm">Showing 1 to {filteredUsers.length} of {filteredUsers.length} results</p>
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

export default UserManagement;
