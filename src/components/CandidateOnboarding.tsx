import React, { useState, useRef } from 'react';
import { Upload, User, Mail, MapPin, Calendar, Check, FileText, Brain, Clock, Shield } from 'lucide-react';

const CandidateOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(2);
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const getStatusText = () => {
    if (isProcessing) return "🧠 Generating Interview Questions...";
    if (currentStep === 1) return "📄 Waiting for Resume Upload...";
    if (currentStep === 2) return "👤 Please fill in your details...";
    if (currentStep === 3) return "📅 Let's schedule your interview...";
    return "✅ Ready to start your interview!";
  };

  const getStatusIcon = () => {
    if (isProcessing) return <Brain className="w-5 h-5 text-yellow-400 animate-pulse" />;
    if (currentStep === 1) return <FileText className="w-5 h-5 text-blue-400" />;
    if (currentStep === 2) return <User className="w-5 h-5 text-green-400" />;
    if (currentStep === 3) return <Calendar className="w-5 h-5 text-purple-400" />;
    return <Check className="w-5 h-5 text-green-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-ping delay-1000"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-6xl mx-auto py-16 px-12 backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Column - Visual + AI Status */}
          <div className="relative">
            {/* Animated Interview Room Visual */}
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10 mb-8">
              {/* Room Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700"></div>
              
              {/* Desk and Setup */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-gray-800"></div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-white/10"></div>
              
              {/* Monitor/Screen */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-gradient-to-br from-blue-900 to-blue-800 rounded border border-blue-400/30">
                <div className="absolute inset-2 bg-gradient-to-br from-blue-800 to-blue-900 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Avatar/Character */}
              <div className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
                currentStep > 1 ? 'translate-x-8' : ''
              }`}>
                <div className="w-12 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full relative">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full"></div>
                  <div className="absolute bottom-0 w-full h-8 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-full"></div>
                </div>
              </div>
              
              {/* Progress Lights */}
              <div className="absolute top-4 left-4 flex space-x-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      currentStep >= step
                        ? 'bg-green-400 animate-pulse'
                        : 'bg-gray-600'
                    }`}
                  ></div>
                ))}
              </div>
              
              {/* AI Particles */}
              <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-70"></div>
              <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
              <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
            </div>

            {/* Status Display Card */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 border border-white/10 shadow-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon()}
                <span className="text-white font-medium transition-all duration-500">
                  {getStatusText()}
                </span>
              </div>
              {isProcessing && (
                <div className="mt-3 h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-green-400 w-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Interactive Form */}
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  InterviewBuddee
                </span>
              </h1>
              <p className="text-gray-400 text-lg">
                Let's get you set up for your AI-powered interview experience
              </p>
            </div>

            {/* Step 1: Upload Resume */}
            {currentStep >= 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <span className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Upload Your Resume
                </h3>
                
                {!uploadedFile ? (
                  <div
                    className={`rounded-2xl bg-white/5 border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
                      isDragOver
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : 'border-neutral-600 hover:bg-white/10 hover:border-neutral-500'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={() => setIsDragOver(true)}
                    onDragLeave={() => setIsDragOver(false)}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white font-medium mb-2">
                      Drop your resume here or click to upload
                    </p>
                    <p className="text-gray-400 text-sm">
                      Supports .pdf and .docx files
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-6 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{uploadedFile.name}</p>
                      <p className="text-green-400 text-sm">Successfully uploaded</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Candidate Info */}
            {currentStep >= 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <span className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Your Information
                </h3>
                
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full rounded-xl px-4 py-3 pl-12 bg-white/5 border border-neutral-700 text-white placeholder:text-neutral-400 focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full rounded-xl px-4 py-3 pl-12 bg-white/5 border border-neutral-700 text-white placeholder:text-neutral-400 focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full rounded-xl px-4 py-3 pl-12 bg-white/5 border border-neutral-700 text-white placeholder:text-neutral-400 focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                
                {formData.fullName && formData.email && formData.location && (
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform"
                  >
                    Continue to Scheduling
                  </button>
                )}
              </div>
            )}

            {/* Step 3: Schedule Interview */}
            {currentStep >= 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <span className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Schedule Your Interview
                </h3>
                
                <div className="rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Brain className="w-6 h-6 text-purple-400 animate-pulse" />
                    <span className="text-white font-medium">AI Recommendation</span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Our AI recommends a slot on{' '}
                    <span className="text-yellow-400 font-semibold">Tuesday, 10:30 AM IST</span>
                  </p>
                  <div className="flex space-x-3">
                    <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold rounded-full hover:scale-105 transition-transform">
                      Confirm
                    </button>
                    <button className="px-6 py-2 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                      Pick Another Time
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Button */}
            {currentStep >= 3 && (
              <button className="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-300 text-black rounded-full px-6 py-4 font-bold shadow-lg hover:scale-105 transition duration-300 flex items-center justify-center space-x-2">
                <span>→ Start My AI-Powered Interview</span>
              </button>
            )}

            {/* Security Footer */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 pt-4">
              <Shield className="w-4 h-4" />
              <span>All data is encrypted & stored securely. Your resume is only used for question generation.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateOnboarding;