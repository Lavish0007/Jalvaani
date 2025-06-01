import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Send } from 'lucide-react';
import Logo from '../shared/Logo';

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    alert('Thank you for subscribing to our newsletter!');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    alert('Thank you for your feedback!');
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left section - Social and Info */}
          <div>
            <div className="flex items-center mb-4">
              <Logo />
              <span className="ml-2 text-xl font-bold text-white">JalVaani</span>
            </div>
            <p className="text-gray-300 mb-4">
              Smart water management for sustainable agriculture
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Middle section - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-blue-400" />
                <span>info@jalvaani.org</span>
              </p>
              <p>42 Water Conservation Road</p>
              <p>New Delhi, India 110001</p>
              <p>+91 98765 43210</p>
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition">About Us</Link>
                <Link to="/weather" className="text-gray-300 hover:text-blue-400 transition">Weather</Link>
                <Link to="/impact" className="text-gray-300 hover:text-blue-400 transition">Our Impact</Link>
                <Link to="/vision" className="text-gray-300 hover:text-blue-400 transition">Our Vision</Link>
                <Link to="/planner" className="text-gray-300 hover:text-blue-400 transition">Planner</Link>
                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition">Contact</Link>
              </div>
            </div>
          </div>
          
          {/* Right section - Newsletter and Feedback */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md flex items-center justify-center transition"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Share Your Feedback</h3>
              <form onSubmit={handleFeedbackSubmit}>
                <textarea 
                  placeholder="We value your suggestions..." 
                  className="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  rows={3}
                  required
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} JalVaani. All rights reserved.</p>
          <p className="mt-1">Saving water, one crop at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;