import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="h-12 w-12 relative mr-3 group-hover:scale-110 transition-transform duration-300">
        <img 
          src="/teal-cg-logo.png" 
          alt="Prince Group Logo" 
          className="w-full h-full object-contain"
        />
        <div className="absolute -inset-1 bg-[#4eb4a7]/30 rounded-full opacity-30 blur-md -z-10"></div>
      </div>
      <div className="text-2xl font-bold flex flex-col">
        <span className="text-[#4eb4a7]">Prince Group</span>
        <span className="text-xs text-gray-500 font-normal -mt-1">Documentation & Loan Services</span>
      </div>
    </Link>
  );
};

export default Logo;
