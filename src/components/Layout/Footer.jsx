import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-lg mt-16 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-600 flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> 
          using React & Tailwind CSS
        </p>
        <p className="text-sm text-gray-500 mt-2">
          © 2024 TaskMaster - All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;