import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Settings, HelpCircle } from 'lucide-react';

const TabbedSmartPanel = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  // Mock data
  const roles = ['.NET Dev', 'AI Engineer', 'Frontend Developer', 'DevOps Specialist'];
  
  // State for General Settings
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [interviewMode, setInterviewMode] = useState('hybrid');
  const [enableSummarizer, setEnableSummarizer] = useState(false);
  const [enableAutoVerdict, setEnableAutoVerdict] = useState(true);
  const [openingPrompt, setOpeningPrompt] = useState('Welcome to the interview. Please tell me about your experience with our core technologies.');
  
  // State for Scoring Model
  const [techDepthWeight, setTechDepthWeight] = useState(60);
  const [communicationWeight, setCommunicationWeight] = useState(20);
  const [problemSolvingWeight, setProblemSolvingWeight] = useState(20);
  
  // State for LLM Settings
  const [selectedModel, setSelectedModel] = useState('GPT-4o');
  const [maxTokens, setMaxTokens] = useState(2048);
  const [temperature, setTemperature] = useState(0.7);
  
  // Mock models
  const models = ['GPT-4o', 'Claude', 'Gemini'];
  
  // Mock prompt cards
  const promptCards = [
    { id: 1, title: 'Interview Kickoff Prompt', content: 'You are an experienced technical interviewer...' },
    { id: 2, title: 'Code Evaluation Prompt', content: 'Evaluate the following code solution...' },
    { id: 3, title: 'Candidate Summary Prompt', content: 'Summarize the candidate\'s performance...' },
    { id: 4, title: 'Final Verdict Prompt', content: 'Based on the interview, provide a final assessment...' }
  ];
  
  // Mock logic chips
  const logicChips = ['C#', 'Azure', 'LLM APIs', 'Prompt Engineering'];
  
  return (
    <div className="flex flex-col w-full h-screen bg-gray-900 text-white p-6 gap-6">
      {/* Sticky Tabs Header */}
      <div className="sticky top-0 z-10 bg-gray-900 pb-4 border-b border-gray-700">
        <div className="flex space-x-1">
          {[
            { id: 'general', label: 'General Settings' },
            { id: 'logic', label: 'Question Logic' },
            { id: 'scoring', label: 'Scoring Model' },
            { id: 'prompts', label: 'AI Prompts' },
            { id: 'llm', label: 'LLM Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 font-medium rounded-t-lg transition-all duration-300 ${activeTab === tab.id 
                ? 'bg-gray-800 text-yellow-500 border-b-2 border-yellow-500' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {/* General Settings */}
        {activeTab === 'general' && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold">General Settings</h2>
            
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Interview Mode</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        name="interviewMode" 
                        checked={interviewMode === 'auto'}
                        onChange={() => setInterviewMode('auto')}
                        className="text-yellow-500 focus:ring-yellow-500"
                      />
                      <span>Auto-mode (AI drives entirely)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        name="interviewMode" 
                        checked={interviewMode === 'hybrid'}
                        onChange={() => setInterviewMode('hybrid')}
                        className="text-yellow-500 focus:ring-yellow-500"
                      />
                      <span>Hybrid-mode (Interviewer + AI)</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={enableSummarizer}
                      onChange={() => setEnableSummarizer(!enableSummarizer)}
                      className="rounded text-yellow-500 focus:ring-yellow-500"
                    />
                    <span>Enable Summarizer</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={enableAutoVerdict}
                      onChange={() => setEnableAutoVerdict(!enableAutoVerdict)}
                      className="rounded text-yellow-500 focus:ring-yellow-500"
                    />
                    <span>Enable Auto Verdict</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Default Opening Prompt for Interviewer</label>
                <textarea 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[120px]"
                  value={openingPrompt}
                  onChange={(e) => setOpeningPrompt(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Question Logic */}
        {activeTab === 'logic' && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold">Question Logic</h2>
            
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <p className="mb-4 text-gray-300">Build your interview logic flow with draggable chips:</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {logicChips.map((chip, index) => (
                  <div 
                    key={index}
                    className="px-3 py-2 bg-yellow-500/20 text-yellow-500 rounded-lg cursor-move border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors"
                  >
                    {chip}
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 font-bold">1</div>
                  <div>
                    <h3 className="font-medium">Ask about experience in C#</h3>
                    <p className="text-sm text-gray-400 mt-1">Initial technical screening question</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="h-8 w-0.5 bg-gray-600"></div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 font-bold">2</div>
                  <div>
                    <h3 className="font-medium">If response {'>'} 7 rating, dive into async/await</h3>
                    <p className="text-sm text-gray-400 mt-1">Advanced technical question based on performance</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="h-8 w-0.5 bg-gray-600"></div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 font-bold">3</div>
                  <div>
                    <h3 className="font-medium">Else fallback to OOP basics</h3>
                    <p className="text-sm text-gray-400 mt-1">Fundamental concepts for candidates needing support</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Scoring Model */}
        {activeTab === 'scoring' && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold">Scoring Model</h2>
            
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Tech Depth Weight</span>
                    <span>{techDepthWeight}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={techDepthWeight}
                    onChange={(e) => setTechDepthWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Communication</span>
                    <span>{communicationWeight}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={communicationWeight}
                    onChange={(e) => setCommunicationWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Problem Solving</span>
                    <span>{problemSolvingWeight}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={problemSolvingWeight}
                    onChange={(e) => setProblemSolvingWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <span>Add Dimension</span>
                  </button>
                </div>
                
                <div className="pt-4">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="rounded text-yellow-500 focus:ring-yellow-500"
                    />
                    <span>Toggle advanced rubric</span>
                  </label>
                  
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full bg-gray-700/50 rounded-lg">
                      <thead>
                        <tr>
                          <th className="text-left p-3 font-medium">Criteria</th>
                          <th className="text-left p-3 font-medium">Poor (1-3)</th>
                          <th className="text-left p-3 font-medium">Average (4-6)</th>
                          <th className="text-left p-3 font-medium">Good (7-9)</th>
                          <th className="text-left p-3 font-medium">Excellent (10)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-600">
                          <td className="p-3">Technical Knowledge</td>
                          <td className="p-3 text-gray-400">Basic understanding</td>
                          <td className="p-3 text-gray-400">Some knowledge gaps</td>
                          <td className="p-3 text-gray-400">Solid understanding</td>
                          <td className="p-3 text-gray-400">Expert level</td>
                        </tr>
                        <tr className="border-t border-gray-600">
                          <td className="p-3">Problem Solving</td>
                          <td className="p-3 text-gray-400">Unable to solve</td>
                          <td className="p-3 text-gray-400">Needs guidance</td>
                          <td className="p-3 text-gray-400">Solves independently</td>
                          <td className="p-3 text-gray-400">Innovative solutions</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* AI Prompts */}
        {activeTab === 'prompts' && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold">AI Prompt Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {promptCards.map((card) => (
                <div key={card.id} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold">{card.title}</h3>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[100px] mb-4"
                    value={card.content}
                    onChange={() => {}}
                  />
                  <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 rounded-lg transition-colors">
                    <Play className="w-4 h-4" />
                    <span>Test Prompt</span>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* LLM Settings */}
        {activeTab === 'llm' && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold">LLM Settings</h2>
            
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Model</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                    >
                      {models.map((model) => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Max Tokens: {maxTokens}</label>
                  <input 
                    type="range" 
                    min="512" 
                    max="4096" 
                    step="128"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Temperature: {temperature}</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <button className="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TabbedSmartPanel;
