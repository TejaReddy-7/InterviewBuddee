import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import WhoItsFor from './components/WhoItsFor';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import LiveInterviewRoom from './components/LiveInterviewRoom';
import CandidateOnboarding from './components/CandidateOnboarding';
import PostInterviewReport from './components/PostInterviewReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-black">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Dashboard />
            <WhoItsFor />
            <Testimonials />
            <Pricing />
            <Footer />
          </div>
        } />
        <Route path="/interview" element={<LiveInterviewRoom />} />
        <Route path="/onboarding" element={<CandidateOnboarding />} />
        <Route path="/report" element={<PostInterviewReport />} />
      </Routes>
    </Router>
  );
}

export default App;