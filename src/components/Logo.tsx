
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="h-10 w-10 relative mr-2 group-hover:scale-110 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-ui-blue-500 to-ui-green-500 rounded-full flex items-center justify-center text-white shadow-md">
          <Shield className="h-5 w-5 text-white" />
          <Check className="h-3 w-3 text-white absolute transform translate-x-[1px] translate-y-[1px]" />
        </div>
      </div>
      <div className="text-2xl font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ui-blue-600 to-ui-green-500">Prince Group</span>
      </div>
    </Link>
  );
};

export default Logo;
