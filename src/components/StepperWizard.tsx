import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, Play, Save, Upload } from 'lucide-react';

const StepperWizard = () => {
  // State
  const [currentStep, setCurrentStep] = useState(1);
  
  // Mock data
  const steps = [
    { id: 1, title: 'Role & Mode' },
    { id: 2, title: 'Question Bank' },
    { id: 3, title: 'AI Prompts' },
    { id: 4, title: 'Evaluation' },
    { id: 5, title: 'Review & Publish' }
  ];
  
  const experienceLevels = [
    { id: 1, label: '0-2 years' },
    { id: 2, label: '3-5 years' },
    { id: 3, label: '6+ years' }
  ];
  
  const skills = ['C#', 'Azure', 'SQL', 'Prompt Engineering'];
  
  const questionBank = [
    { id: 1, text: 'Explain the difference between IEnumerable and IQueryable in C#.', tags: ['Mandatory', 'C#'] },
    { id: 2, text: 'How would you design a scalable microservices architecture?', tags: ['Mandatory', 'System Design'] },
    { id: 3, text: 'What are the benefits of using Azure Functions?', tags: ['Optional', 'Azure'] },
    { id: 4, text: 'How do you optimize SQL queries for performance?', tags: ['Weighted', 'SQL'] },
    { id: 5, text: 'Explain the concept of prompt engineering.', tags: ['Mandatory', 'Prompt Engineering'] }
  ];
  
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([1, 2]);
  
  const rubricData = [
    { id: 1, criteria: 'Code Correctness', weight: 40, description: 'Clean, functional implementation' },
    { id: 2, criteria: 'System Design', weight: 30, description: 'Modularity, scalability' },
    { id: 3, criteria: 'Communication', weight: 30, description: 'Clear articulation of ideas' }
  ];
  
  // State for form inputs
  const [roleTitle, setRoleTitle] = useState('.NET Developer');
  const [interviewMode, setInterviewMode] = useState('Hybrid');
  const [description, setDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState(2);
  
  // Handle question selection
  const toggleQuestionSelection = (id: number) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter(qId => qId !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };
  
  // Handle rubric weight change
  const handleWeightChange = (id: number, weight: number) => {
    // In a real app, this would update the rubric data
    console.log(`Updated weight for criteria ${id} to ${weight}%`);
  };
  
  // Navigation functions
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold">Role & Interview Mode</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Role Title</label>
                <input 
                  type="text" 
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none text-white placeholder-gray-400"
                  placeholder="Enter role title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Interview Mode</label>
                <div className="flex gap-4">
                  {['Manual', 'Hybrid', 'AI-led'].map((mode) => (
                    <button
                      key={mode}
                      className={`px-4 py-2 rounded-lg ${interviewMode === mode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                      onClick={() => setInterviewMode(mode)}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none text-white placeholder-gray-400"
                  placeholder="Add role description"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Experience Level</label>
                <div className="flex gap-4">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      className={`px-4 py-2 rounded-lg ${experienceLevel === level.id ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                      onClick={() => setExperienceLevel(level.id)}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold">Select Questions</h2>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button 
                  key={skill}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm hover:bg-gray-600 text-gray-300"
                >
                  {skill}
                </button>
              ))}
              <button className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-gray-900 rounded-full text-sm">
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {questionBank.map((question) => (
                <div 
                  key={question.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedQuestions.includes(question.id) ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-600 bg-gray-700'}`}
                  onClick={() => toggleQuestionSelection(question.id)}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-gray-200">{question.text}</p>
                    <div className="flex gap-2">
                      {question.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className={`px-2 py-1 text-xs rounded ${tag === 'Mandatory' ? 'bg-red-500/20 text-red-300' : tag === 'Optional' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 w-full justify-center text-gray-300">
                <Plus className="w-4 h-4" />
                <span>Add Custom Question</span>
              </button>
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold">AI Prompt Settings</h2>
            
            <div className="space-y-6">
              {selectedQuestions.map((questionId) => {
                const question = questionBank.find(q => q.id === questionId);
                return (
                  <div key={questionId} className="space-y-3">
                    <h3 className="font-medium text-gray-200">{question?.text}</h3>
                    <textarea 
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none text-white placeholder-gray-400"
                      placeholder="Add AI evaluation prompt for this question"
                      rows={3}
                      defaultValue={`Evaluate candidate's understanding of this concept with real-world examples.`}
                    />
                    
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-gray-300">
                        <input type="checkbox" className="rounded bg-gray-700 border-gray-600" defaultChecked />
                        <span>Summarize</span>
                      </label>
                      <label className="flex items-center gap-2 text-gray-300">
                        <input type="checkbox" className="rounded bg-gray-700 border-gray-600" defaultChecked />
                        <span>Auto-score</span>
                      </label>
                      <label className="flex items-center gap-2 text-gray-300">
                        <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                        <span>Custom Verdict Logic</span>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold">Evaluation Rubric</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="py-3 px-4 text-left text-gray-300">Criteria</th>
                    <th className="py-3 px-4 text-left text-gray-300">Weight</th>
                    <th className="py-3 px-4 text-left text-gray-300">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {rubricData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-700">
                      <td className="py-3 px-4 text-gray-200">{item.criteria}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={item.weight}
                            onChange={(e) => handleWeightChange(item.id, parseInt(e.target.value))}
                            className="w-24"
                          />
                          <span className="w-10 text-gray-300">{item.weight}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-gray-300">
              <Plus className="w-4 h-4" />
              <span>Add New Criteria</span>
            </button>
          </motion.div>
        );
      
      case 5:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold">Review & Publish</h2>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="font-bold mb-4 text-gray-200">Interview Preview</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-200">Role: {roleTitle}</h4>
                  <p className="text-sm text-gray-400">Mode: {interviewMode} | Experience: {experienceLevels.find(l => l.id === experienceLevel)?.label}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-gray-200">Selected Questions ({selectedQuestions.length})</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    {selectedQuestions.map((questionId) => {
                      const question = questionBank.find(q => q.id === questionId);
                      return <li key={questionId}>{question?.text}</li>;
                    })}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-gray-200">Evaluation Rubric</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    {rubricData.map((item) => (
                      <li key={item.id}>{item.criteria}: {item.weight}% - {item.description}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600">
                <Play className="w-4 h-4" />
                <span>Test Interview</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 text-gray-300">
                <Save className="w-4 h-4" />
                <span>Save as Template</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Upload className="w-4 h-4" />
                <span>Publish</span>
              </button>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col w-full min-h-screen p-10 bg-gray-900 text-white gap-8">
      {/* Top Stepper Bar */}
      <div className="flex justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-yellow-500 -translate-y-1/2 z-10 transition-all duration-500"
          style={{ width: `${(currentStep - 1) * 25}%` }}
        ></div>
        
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center z-20 relative">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${currentStep === step.id ? 'bg-yellow-500 text-gray-900 scale-110' : currentStep > step.id ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}
            >
              {currentStep > step.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="font-bold">{step.id}</span>
              )}
            </div>
            <span className={`text-sm text-center ${currentStep === step.id ? 'font-bold text-yellow-500' : currentStep > step.id ? 'text-green-500' : 'text-gray-500'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
      
      {/* Step Content */}
      <div className="flex-1 bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
        {renderStepContent()}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button 
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg ${currentStep === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        >
          Previous
        </button>
        <button 
          onClick={nextStep}
          disabled={currentStep === 5}
          className={`px-6 py-3 rounded-lg ${currentStep === 5 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'}`}
        >
          {currentStep === 4 ? 'Review & Publish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default StepperWizard;
