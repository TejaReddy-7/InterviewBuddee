import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Edit, Zap, ChevronUp, ChevronDown, Settings, User, Clock, Brain, BarChart } from 'lucide-react';

const ImmersiveSimulator = () => {
  // State
  const [isSimulating, setIsSimulating] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedPersona, setSelectedPersona] = useState('Test Persona A');
  const [aiMode, setAiMode] = useState('GPT-4');
  const [showVerdictPanel, setShowVerdictPanel] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Mock data
  const role = '.NET Developer – L2';
  const interviewType = 'Hybrid';
  
  const personas = [
    'Test Persona A',
    'Test Persona B',
    'Test Persona C'
  ];
  
  const questions = [
    {
      id: 1,
      text: 'Explain the difference between IEnumerable and IQueryable in C#.',
      type: 'Auto'
    },
    {
      id: 2,
      text: 'How would you design a scalable microservices architecture?',
      type: 'Manual'
    },
    {
      id: 3,
      text: 'What are the benefits of using Azure Functions?',
      type: 'Auto'
    },
    {
      id: 4,
      text: 'How do you optimize SQL queries for performance?',
      type: 'Manual'
    }
  ];
  
  const aiAnswers = [
    "As a mid-level .NET developer, I understand that IEnumerable and IQueryable are both interfaces in C#. IEnumerable is used for in-memory collections and executes queries on the client side. IQueryable, on the other hand, is used for out-of-memory collections like databases and executes queries on the server side. This means IQueryable can translate expressions to SQL for database queries, which is more efficient for large datasets.",
    "In designing a scalable microservices architecture, I would focus on several key principles. First, I'd ensure each service has a single responsibility and clear boundaries. I'd use API Gateways for routing and implement circuit breakers for fault tolerance. For data management, each service would have its own database to maintain loose coupling. I'd also implement asynchronous communication using message queues and ensure proper monitoring and logging across services.",
    "Azure Functions provide several benefits for serverless computing. They offer a consumption-based pricing model, meaning you only pay for the time your code runs. They automatically scale based on demand, which is great for handling variable workloads. Azure Functions also support multiple programming languages and integrate well with other Azure services. They're ideal for event-driven scenarios and can help reduce operational overhead.",
    "To optimize SQL queries for performance, I'd start with proper indexing strategies. I'd analyze query execution plans to identify bottlenecks. Using stored procedures can reduce network traffic and improve security. I'd also avoid SELECT * and instead specify only needed columns. For large datasets, I'd implement pagination and consider using query result caching. Additionally, I'd optimize JOIN operations and use EXISTS instead of IN clauses where appropriate."
  ];
  
  const verdictData = {
    overallScore: 87,
    breakdown: [
      { criteria: 'Code Correctness', score: 90, weight: 40 },
      { criteria: 'System Design', score: 85, weight: 30 },
      { criteria: 'Communication', score: 82, weight: 30 }
    ],
    reasoning: "The candidate demonstrated strong technical knowledge with clear explanations. They correctly identified key concepts and provided practical examples. Areas for improvement include more specific details on certain implementation aspects.",
    tokenUsage: [
      { question: 'IEnumerable vs IQueryable', tokens: 124 },
      { question: 'Microservices Design', tokens: 187 },
      { question: 'Azure Functions', tokens: 156 },
      { question: 'SQL Optimization', tokens: 168 }
    ],
    edgeCases: [
      'Did not mention async/await patterns',
      'Could elaborate on security considerations',
      'Missing real-world performance metrics'
    ]
  };
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSimulating) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating]);
  
  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle simulate toggle
  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };
  
  // Handle next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Handle previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  return (
    <div className="flex flex-col w-full h-screen bg-gray-900 p-8 text-white relative overflow-hidden">
      {/* Simulation Header */}
      <motion.div 
        className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-800 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <h1 className="text-xl font-bold">{role}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded text-sm">{interviewType}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <select 
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value)}
            >
              {personas.map((persona) => (
                <option key={persona} value={persona}>{persona}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-gray-400" />
            <div className="flex bg-gray-700 rounded-lg p-1">
              <button 
                className={`px-3 py-1 rounded text-xs ${aiMode === 'GPT-4' ? 'bg-yellow-500 text-gray-900' : 'text-gray-300'}`}
                onClick={() => setAiMode('GPT-4')}
              >
                GPT-4
              </button>
              <button 
                className={`px-3 py-1 rounded text-xs ${aiMode === 'Custom' ? 'bg-yellow-500 text-gray-900' : 'text-gray-300'}`}
                onClick={() => setAiMode('Custom')}
              >
                Custom Agent
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-lg">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-mono">{formatTime(timeElapsed)}</span>
          </div>
          
          <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isSimulating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition-colors`}
            onClick={toggleSimulation}
          >
            {isSimulating ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Simulate</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
      
      {/* Live Interview Simulation View */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        {/* Questions Column */}
        <motion.div 
          className="w-full md:w-1/2 bg-gray-800 rounded-lg p-4 overflow-y-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-lg font-bold mb-4">Questions</h2>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div 
                key={question.id}
                className={`p-4 rounded-lg border ${index === currentQuestionIndex ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 bg-gray-700/50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-400">Q{question.id}</span>
                  <span className={`px-2 py-1 rounded text-xs ${question.type === 'Auto' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}>
                    {question.type}
                  </span>
                </div>
                <p className="text-gray-200">{question.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* AI Answers Column */}
        <motion.div 
          className="w-full md:w-1/2 bg-gray-800 rounded-lg p-4 overflow-y-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-bold mb-4">AI Simulated Response</h2>
          <div className="space-y-4">
            <AnimatePresence>
              <motion.div 
                className="p-4 bg-gray-700 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 font-bold">
                    AI
                  </div>
                  <span className="font-medium">{selectedPersona}</span>
                </div>
                <div className="text-gray-300">
                  {aiAnswers[currentQuestionIndex]}
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex gap-2">
              <button 
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-sm"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronUp className="w-4 h-4" />
                <span>Prev</span>
              </button>
              <button 
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-sm"
                onClick={nextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                <span>Next</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Admin Actions */}
      <motion.div 
        className="flex flex-wrap gap-3 mt-6 p-4 bg-gray-800 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
          <Settings className="w-4 h-4" />
          <span>Override Prompt</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
          <RotateCcw className="w-4 h-4" />
          <span>Replay AI Answer</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
          <Edit className="w-4 h-4" />
          <span>Edit Question</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
          <Zap className="w-4 h-4" />
          <span>Force Verdict</span>
        </button>
      </motion.div>
      
      {/* Verdict Testing Panel Toggle */}
      <motion.button 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-t-lg border-t border-x border-gray-700"
        onClick={() => setShowVerdictPanel(!showVerdictPanel)}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        <BarChart className="w-4 h-4" />
        <span>Verdict Testing Panel</span>
        {showVerdictPanel ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </motion.button>
      
      {/* Verdict Testing Panel (Sticky Bottom Drawer) */}
      <AnimatePresence>
        {showVerdictPanel && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 rounded-t-xl p-6 h-2/5 overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Verdict Testing Panel</h2>
              <button 
                className="p-2 rounded-full hover:bg-gray-700"
                onClick={() => setShowVerdictPanel(false)}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Score Breakdown */}
              <div>
                <h3 className="font-bold mb-3 text-lg">Score Breakdown</h3>
                <div className="mb-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Overall Score</span>
                    <span className="text-2xl font-bold text-yellow-500">{verdictData.overallScore}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600" 
                      style={{ width: `${verdictData.overallScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {verdictData.breakdown.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{item.criteria}</span>
                        <span>{item.score}%</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Weight: {item.weight}%</span>
                        <span>Score: {Math.round(item.score * item.weight / 100)}/{item.weight}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" 
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI Reasoning & Token Usage */}
              <div>
                <div className="mb-6">
                  <h3 className="font-bold mb-3 text-lg">AI Reasoning</h3>
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-300">{verdictData.reasoning}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-3 text-lg">Token Usage</h3>
                  <div className="space-y-3">
                    {verdictData.tokenUsage.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{item.question}</span>
                          <span>{item.tokens} tokens</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-600" 
                            style={{ width: `${(item.tokens / 200) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Edge Case Coverage */}
            <div className="mt-6">
              <h3 className="font-bold mb-3 text-lg">Edge Case Coverage</h3>
              <div className="flex flex-wrap gap-2">
                {verdictData.edgeCases.map((flag, index) => (
                  <span key={index} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImmersiveSimulator;
