import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import Logo from '../shared/Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHindi, setIsHindi] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    setIsHindi(!isHindi);
    // Update main headings throughout the application
    const translations = {
      'About Us': 'हमारे बारे में',
      'Analytics': 'विश्लेषण',
      'Irrigation Management': 'सिंचाई प्रबंधन',
      'Sample Irrigation Planner': 'नमूना सिंचाई योजनाकार',
      'Weather Forecast': 'मौसम का पूर्वानुमान',
      'Our Impact': 'हमारा प्रभाव',
      'Our Vision': 'हमारी दृष्टि',
      'Contact Us': 'संपर्क करें'
    };

    document.querySelectorAll('h1, h2, h3').forEach(element => {
      const text = element.textContent;
      if (translations[text]) {
        element.textContent = isHindi ? text : translations[text];
      }
    });
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-bold text-blue-700">JalVaani</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition">Home</Link>
            <Link to="/about" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition">About</Link>
            <Link to="/weather" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition">Weather</Link>
            <Link to="/planner" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition">Planner</Link>
            
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 text-gray-700 hover:text-blue-600 transition"
            >
              {isHindi ? 'English' : 'हिंदी'}
            </button>
            
            <Link 
              to="/login" 
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <LogIn className="mr-1 h-4 w-4" />
              Login / Signup
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 shadow-lg">
          <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 border-b border-gray-100">Home</Link>
          <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 border-b border-gray-100">About</Link>
          <Link to="/weather" className="block px-3 py-2 text-gray-700 hover:text-blue-600 border-b border-gray-100">Weather</Link>
          <Link to="/planner" className="block px-3 py-2 text-gray-700 hover:text-blue-600 border-b border-gray-100">Planner</Link>
          
          <button
            onClick={toggleLanguage}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 border-b border-gray-100"
          >
            {isHindi ? 'English' : 'हिंदी'}
          </button>
          
          <Link to="/login" className="block px-3 py-2 text-blue-600 font-medium hover:text-blue-800 mt-2 flex items-center">
            <LogIn className="mr-1 h-4 w-4" />
            Login / Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;