
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TwentyFirstToolbar } from '@21st-extension/toolbar-react';
import { ReactPlugin } from '@21st-extension/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import AdminDashboard from './components/AdminDashboard';
import Dashboard from './components/Dashboard';
import WhoItsFor from './components/WhoItsFor';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import SplitPanelInterview from './components/SplitPanelInterview';
import CandidateInterview from './components/CandidateInterview';
import PostInterviewAnalysis from './components/PostInterviewAnalysis';
import CandidateOnboarding from './components/CandidateOnboarding';
import PostInterviewReport from './components/PostInterviewReport';
import MainDashboard from './components/MainDashboard';

function App() {
  return (
    <>
      <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />
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
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/interview" element={<SplitPanelInterview />} />
          <Route path="/candidate-interview" element={<CandidateInterview />} />
          <Route path="/post-interview" element={<PostInterviewAnalysis />} />
          <Route path="/onboarding" element={<CandidateOnboarding />} />
          <Route path="/report" element={<PostInterviewReport />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;