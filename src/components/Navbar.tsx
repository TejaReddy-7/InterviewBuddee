import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/20 backdrop-blur-lg border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">
              Interview<span className="text-yellow-400">Buddee</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Platform', 'AI', 'Reports', 'Login'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition duration-300 hover:scale-105"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/interview')}
                className="group relative px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300 border-2 border-yellow-400 hover:shadow-yellow-400/50"
              >
                <span className="relative z-10">Launch Interview Studio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Platform', 'AI', 'Reports', 'Login'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full mt-4 px-6 py-3 bg-gray-800 text-white font-semibold rounded-full"
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/interview')}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold rounded-full"
              >
                Launch Interview Studio
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;