
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="h-10 w-10 relative mr-2 group-hover:scale-110 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-ui-blue-500 to-ui-cyan-400 rounded-full flex items-center justify-center text-white shadow-lg">
          <Shield className="h-5 w-5 text-white" />
          <Check className="h-3 w-3 text-white absolute transform translate-x-[1px] translate-y-[1px]" />
        </div>
      </div>
      <div className="text-2xl font-bold flex items-center">
        <span className="gradient-heading group-hover:gradient-heading-green transition-all duration-300">Prince Group</span>
      </div>
    </Link>
  );
};

export default Logo;
