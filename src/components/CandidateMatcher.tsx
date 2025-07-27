import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Send, UserCheck, FileText, Info } from 'lucide-react';

const CandidateMatcher = () => {
  // Mock data for candidates - expanded to show pagination
  const [candidates] = useState([
    { id: 1, name: 'Ravi Sharma', role: '.NET Developer', score: 89, verdict: 'Pass', date: '12-Jul-25', tags: ['Mid-level', 'APAC'] },
    { id: 2, name: 'Elena Roberts', role: 'Prompt Engineer', score: 78, verdict: 'Re-Eval', date: '15-Jul-25', tags: ['AI-native'] },
    { id: 3, name: 'Nikhil Patel', role: 'Fullstack Developer', score: 92, verdict: 'Pass', date: '10-Jul-25', tags: ['Senior', 'US'] },
    { id: 4, name: 'Sarah Johnson', role: 'Java Developer', score: 85, verdict: 'Pass', date: '14-Jul-25', tags: ['Mid-level', 'EU'] },
    { id: 5, name: 'Michael Chen', role: 'DevOps Engineer', score: 76, verdict: 'Rejected', date: '13-Jul-25', tags: ['Senior', 'APAC'] },
    { id: 6, name: 'Alex Morgan', role: 'Frontend Developer', score: 88, verdict: 'Pass', date: '11-Jul-25', tags: ['Mid-level', 'US'] },
    { id: 7, name: 'Priya Kumar', role: 'Data Scientist', score: 91, verdict: 'Pass', date: '09-Jul-25', tags: ['Senior', 'APAC'] },
    { id: 8, name: 'James Wilson', role: 'Backend Engineer', score: 75, verdict: 'Re-Eval', date: '16-Jul-25', tags: ['Junior', 'EU'] },
    { id: 9, name: 'Sophia Lee', role: 'UX Designer', score: 82, verdict: 'Pass', date: '08-Jul-25', tags: ['Mid-level', 'US'] },
    { id: 10, name: 'David Kim', role: 'Mobile Developer', score: 79, verdict: 'Rejected', date: '17-Jul-25', tags: ['Mid-level', 'APAC'] },
    { id: 11, name: 'Emma Thompson', role: 'QA Engineer', score: 84, verdict: 'Pass', date: '07-Jul-25', tags: ['Senior', 'EU'] },
    { id: 12, name: 'Robert Garcia', role: 'System Architect', score: 93, verdict: 'Pass', date: '18-Jul-25', tags: ['Senior', 'US'] },
    { id: 13, name: 'Olivia Chen', role: 'Product Manager', score: 87, verdict: 'Re-Eval', date: '06-Jul-25', tags: ['Senior', 'APAC'] },
    { id: 14, name: 'Thomas Brown', role: 'Security Specialist', score: 81, verdict: 'Pass', date: '19-Jul-25', tags: ['Mid-level', 'EU'] },
    { id: 15, name: 'Ava Davis', role: 'Cloud Engineer', score: 86, verdict: 'Pass', date: '05-Jul-25', tags: ['Mid-level', 'US'] },
    { id: 16, name: 'William Miller', role: 'DevOps Engineer', score: 77, verdict: 'Rejected', date: '20-Jul-25', tags: ['Junior', 'APAC'] },
    { id: 17, name: 'Isabella Wilson', role: 'AI Researcher', score: 94, verdict: 'Pass', date: '04-Jul-25', tags: ['Senior', 'US'] },
    { id: 18, name: 'Liam Johnson', role: 'Fullstack Developer', score: 83, verdict: 'Pass', date: '21-Jul-25', tags: ['Mid-level', 'EU'] },
    { id: 19, name: 'Mia Rodriguez', role: 'Data Engineer', score: 80, verdict: 'Re-Eval', date: '03-Jul-25', tags: ['Mid-level', 'APAC'] },
    { id: 20, name: 'Noah Martinez', role: 'Backend Developer', score: 85, verdict: 'Pass', date: '22-Jul-25', tags: ['Junior', 'US'] },
  ]);

 
  // Mock data for matches
  const [matches] = useState([
    { id: 1, name: 'Elena Roberts', matchPercent: 92, skills: ['Prompting', 'React'], verdict: 'Pass' },
    { id: 2, name: 'Nikhil Patel', matchPercent: 87, skills: ['Azure', 'Gen AI APIs'], verdict: 'Pass' },
    { id: 3, name: 'Sarah Johnson', matchPercent: 81, skills: ['Java', 'Spring Boot'], verdict: 'Pass' },
    { id: 4, name: 'Ravi Sharma', matchPercent: 78, skills: ['.NET', 'SQL'], verdict: 'Re-Eval' },
    { id: 5, name: 'Michael Chen', matchPercent: 72, skills: ['Docker', 'Kubernetes'], verdict: 'Rejected' },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [filters] = useState({
    roles: ['.NET', 'Java', 'Prompt Engg.'],
    experience: [0, 10],
    score: [0, 100],
    verdicts: ['Pass', 'Rejected', 'Re-Eval'],
    aiConfidence: false
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  
  // Calculate pagination values
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentCandidates = candidates.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(candidates.length / recordsPerPage);

  const handleRowClick = (id: number) => {
    setSelectedCandidate(id);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    // Calculate start and end pages
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust startPage if endPage is at the maximum
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Previous button
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key="prev"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-600'}`}
        >
          &lt;
        </button>
      );
    }
    
    // First page
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pageNumbers.push(
          <span key="start-ellipsis" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${currentPage === i ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
        >
          {i}
        </button>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="end-ellipsis" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
      
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
        >
          {totalPages}
        </button>
      );
    }
    
    // Next button
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key="next"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-600'}`}
        >
          &gt;
        </button>
      );
    }
    
    return pageNumbers;
  };


  return (
    <div className="flex flex-col h-full p-6 bg-gray-900 text-white overflow-auto" style={{ height: 'calc(100vh - 2rem)' }}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Candidate Matcher</h1>
        <p className="text-gray-400">Find the best candidates for your roles</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-auto">
        {/* Left Pane: Candidate Talent Pool */}
        <div className="lg:col-span-2 flex flex-col overflow-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Candidate Talent Pool</h2>
            <p className="text-gray-400">Browse and match candidates for your open roles</p>
          </div>
        
        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <button className="flex items-center text-sm text-gray-400 hover:text-white">
              <SlidersHorizontal className="w-4 h-4 mr-1" />
              More Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <div className="flex flex-wrap gap-2">
                {filters.roles.map((role, index) => (
                  <button 
                    key={index}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition-colors"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Experience Slider */}
            <div>
              <label className="block text-sm font-medium mb-2">Experience (Years)</label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">0</span>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value="10" 
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-gray-500">20</span>
              </div>
            </div>
            
            {/* Interview Score Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Interview Score</label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">0%</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value="50" 
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-gray-500">100%</span>
              </div>
            </div>
            
            {/* Verdict Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Verdict</label>
              <div className="flex flex-wrap gap-2">
                {filters.verdicts.map((verdict, index) => (
                  <button 
                    key={index}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition-colors"
                  >
                    {verdict}
                  </button>
                ))}
              </div>
            </div>
            
            {/* AI Confidence Toggle */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={filters.aiConfidence} />
                  <div className={`block w-14 h-8 rounded-full ${filters.aiConfidence ? 'bg-yellow-500' : 'bg-gray-700'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${filters.aiConfidence ? 'transform translate-x-6' : ''}`}></div>
                </div>
                <div className="ml-3 text-sm font-medium">AI Confidence %</div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Table View */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-auto flex-1 flex flex-col">
          <div className="overflow-auto flex-1 min-h-0 max-h-full">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Verdict</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tags</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700 text-white">
                {currentCandidates.map((candidate) => (
                  <motion.tr 
                    key={candidate.id}
                    className={`cursor-pointer hover:bg-gray-700 ${selectedCandidate === candidate.id ? 'bg-gray-700' : ''}`}
                    onClick={() => handleRowClick(candidate.id)}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{candidate.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{candidate.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center">
                        <span className="mr-2">{candidate.score}%</span>
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <motion.div 
                            className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" 
                            initial={{ width: 0 }}
                            animate={{ width: `${candidate.score}%` }}
                            transition={{ duration: 0.5 }}
                          ></motion.div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${candidate.verdict === 'Pass' ? 'bg-green-800 text-green-100' : 
                          candidate.verdict === 'Rejected' ? 'bg-red-800 text-red-100' : 
                          'bg-yellow-800 text-yellow-100'}`}>
                        {candidate.verdict === 'Pass' ? '✅ Pass' : 
                         candidate.verdict === 'Rejected' ? '❌ Rejected' : '⏳ Re-Eval'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{candidate.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex flex-wrap gap-1">
                        {candidate.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="bg-gray-800 border-t border-gray-700 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, candidates.length)} of {candidates.length} candidates
              </div>
              <div className="flex space-x-1">
                {renderPagination()}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Right Pane: Smart Match Assistant */}
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Smart Match Assistant</h2>
          <p className="text-gray-400">Find the best candidates for your roles</p>
        </div>
        
        {/* Match Prompt */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
          <div className="flex items-start mb-4">
            <div className="mr-3 bg-yellow-500/20 p-2 rounded-full">
              <Info className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="font-medium">Find top 5 candidates from the pool who best match `Gen AI Fullstack` role</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors">
              <Send className="w-4 h-4 mr-2" />
              Send Interview Invite
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <UserCheck className="w-4 h-4 mr-2" />
              Recommend to Hiring Manager
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <FileText className="w-4 h-4 mr-2" />
              View Full Transcript
            </button>
          </div>
        </div>
        
        {/* Match Results */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex-1 overflow-auto flex flex-col">
          <h2 className="text-xl font-bold mb-4">Top Matches</h2>
          
          <div className="space-y-4 overflow-y-auto flex-1 pr-2" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            {matches.map((match) => (
              <motion.div 
                key={match.id}
                className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold">{match.name}</h3>
                  <span className="text-lg font-bold text-yellow-500">{match.matchPercent}%</span>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Match Score</span>
                    <span>{match.matchPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600" 
                      initial={{ width: 0 }}
                      animate={{ width: `${match.matchPercent}%` }}
                      transition={{ duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-400 mb-1">Key Skills Matched</p>
                  <div className="flex flex-wrap gap-1">
                    {match.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${match.verdict === 'Pass' ? 'bg-green-100 text-green-800' : 
                      match.verdict === 'Rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {match.verdict === 'Pass' ? '✅ Pass' : 
                     match.verdict === 'Rejected' ? '❌ Rejected' : '⏳ Re-Eval'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* AI Insights Bubble */}
        <motion.div 
          className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-5 shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start">
            <div className="mr-3 bg-white/20 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold mb-1">AI Insights</h3>
              <p className="text-sm">This candidate is a great fit for your role because they demonstrate strong skills in Gen AI technologies and have relevant experience in fullstack development.</p>
              <div className="mt-3 text-xs flex items-center">
                <span className="mr-2">Backed by:</span>
                <span className="px-2 py-1 bg-white/20 rounded mr-2">Skill Match</span>
                <span className="px-2 py-1 bg-white/20 rounded mr-2">AI Confidence: 92%</span>
                <span className="px-2 py-1 bg-white/20 rounded">History Match</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default CandidateMatcher;
