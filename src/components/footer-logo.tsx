import React from 'react';
import { Link } from 'react-router-dom';

const FooterLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="h-10 w-auto max-w-[120px] relative flex items-center mr-2 group-hover:scale-110 transition-transform duration-300">
        <img 
          src="/footerlogo.png" 
          alt="Prince Group Logo" 
          className="w-full h-full object-contain"
          style={{ maxHeight: '40px' }}
        />
        <div className="absolute -inset-1 bg-[#4eb4a7]/30 rounded-full opacity-30 blur-md -z-10"></div>
      </div>
      
    </Link>
  );
};

export default FooterLogo;