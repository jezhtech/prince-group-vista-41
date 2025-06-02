import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="h-16 w-16 relative flex items-center mr-4 group-hover:scale-110 transition-transform duration-300">
        <img 
          src="/teal-cg-logo.png" 
          alt="Prince Group Logo" 
          className="w-full h-full object-contain"
        />
        <div className="absolute -inset-1 bg-[#4eb4a7]/30 rounded-full opacity-30 blur-md -z-10"></div>
      </div>
      <div className="flex flex-col mt-0">
        <span className="text-[#4eb4a7] text-3xl font-bold leading-none tracking-tight">PRINCE GROUP</span>
        <div className="flex flex-col items-center mt-1 w-full">
          <span className="text-[6px] text-gray-800 font-bold uppercase leading-none tracking-[0.15em] text-center">20 BRANCHES ALL- OVER KANYAKUMARI DISTRICT</span>
          <span className="text-[7px] text-gray-800 font-bold leading-none tracking-wide text-center mt-0.5">The One Brand For All Your Needs</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
