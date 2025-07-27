import React, { useState } from 'react';
import { Search, Filter, Plus, Upload, Edit, Trash2, Eye, MoreHorizontal, X, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const QuestionBank = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  
  // Mock question data
  const questions = [
    { id: 1, question: 'Tell me about a time you had to solve a complex technical problem under pressure.', category: 'Behavioral', difficulty: 'Hard', tags: ['Problem Solving', 'Pressure'], used: 24 },
    { id: 2, question: 'Explain the difference between TCP and UDP protocols.', category: 'Technical', difficulty: 'Medium', tags: ['Networking', 'Protocols'], used: 18 },
    { id: 3, question: 'How do you handle conflicts within a team?', category: 'Behavioral', difficulty: 'Medium', tags: ['Teamwork', 'Conflict Resolution'], used: 32 },
    { id: 4, question: 'Describe the architecture of a web application you designed.', category: 'Technical', difficulty: 'Hard', tags: ['Architecture', 'Design'], used: 15 },
    { id: 5, question: 'Why do you want to work for our company?', category: 'General', difficulty: 'Easy', tags: ['Motivation', 'Culture Fit'], used: 42 },
    { id: 6, question: 'How do you stay updated with the latest technology trends?', category: 'General', difficulty: 'Easy', tags: ['Learning', 'Growth'], used: 28 },
  ];
  
  // Filter questions based on active tab and search term
  const filteredQuestions = questions.filter(question => {
    const matchesTab = activeTab === 'all' || question.category.toLowerCase() === activeTab;
    
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });
  
  // Difficulty badge styling
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the question
    setIsModalOpen(false);
    setEditingQuestion(null);
  };
  
  // Handle import submission
  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would import questions
    setIsImportModalOpen(false);
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold">Question Bank</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your interview questions and categories</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <motion.button 
            className="flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsImportModalOpen(true)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </motion.button>
          
          <motion.button 
            className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-4 py-2 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingQuestion(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </motion.button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex flex-wrap border-b border-white/10 mb-6 gap-2">
        {['all', 'technical', 'behavioral', 'general'].map((tab) => (
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
      
      {/* Questions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm border-b border-white/10">
              <th className="pb-4 font-medium">Question</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Difficulty</th>
              <th className="pb-4 font-medium">Tags</th>
              <th className="pb-4 font-medium">Used</th>
              <th className="pb-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((question, index) => (
              <motion.tr 
                key={question.id} 
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="py-4 max-w-xs">
                  <div className="font-medium line-clamp-2">{question.question}</div>
                </td>
                <td className="py-4">
                  <span className="px-2 py-1 bg-white/10 rounded text-xs capitalize">{question.category}</span>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyStyle(question.difficulty)}`}>
                    {question.difficulty}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-1">
                    {question.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 text-gray-400 text-sm">{question.used} times</td>
                <td className="py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <motion.button 
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setEditingQuestion(question);
                        setIsModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4 text-gray-400" />
                    </motion.button>
                    <motion.button 
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setEditingQuestion(question);
                        setIsModalOpen(true);
                      }}
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
        <p className="text-gray-400 text-sm">Showing 1 to {filteredQuestions.length} of {filteredQuestions.length} results</p>
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
      
      {/* Add/Edit Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h3>
              <motion.button 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingQuestion(null);
                }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Question</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 min-h-[120px]"
                  defaultValue={editingQuestion?.question || ''}
                  placeholder="Enter your interview question..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    defaultValue={editingQuestion?.category?.toLowerCase() || 'technical'}
                  >
                    <option value="technical">Technical</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="general">General</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    defaultValue={editingQuestion?.difficulty?.toLowerCase() || 'medium'}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  defaultValue={editingQuestion?.tags?.join(', ') || ''}
                  placeholder="Enter tags separated by commas..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <motion.button 
                  type="button"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingQuestion(null);
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button 
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Question
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      {/* Import Questions Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold">Import Questions</h3>
              <motion.button 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsImportModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            <form onSubmit={handleImportSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Upload File</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-yellow-400/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-gray-500 text-sm mt-1">CSV, JSON formats supported</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <motion.button 
                  type="button"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsImportModalOpen(false)}
                >
                  Cancel
                </motion.button>
                <motion.button 
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Import Questions
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
