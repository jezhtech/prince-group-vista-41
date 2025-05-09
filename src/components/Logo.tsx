
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="h-10 w-10 relative mr-3 group-hover:scale-110 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-ui-blue-500 to-ui-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
          <Shield className="h-5 w-5 text-white" strokeWidth={2} />
          <Check className="h-3 w-3 text-white absolute transform translate-x-[1px] translate-y-[1px]" strokeWidth={3} />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-br from-ui-blue-400 to-ui-green-400 rounded-full opacity-30 blur-md -z-10"></div>
      </div>
      <div className="text-2xl font-bold flex flex-col">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ui-blue-600 to-ui-green-500 leading-tight">Prince Group</span>
        <span className="text-xs text-gray-500 font-normal -mt-1">Documentation & Loan Services</span>
      </div>
    </Link>
  );
};

export default Logo;
