
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="text-2xl font-bold flex items-center">
        <div className="h-10 w-10 relative mr-2">
          <div className="absolute inset-0 bg-gradient-to-r from-prince-green to-prince-accent rounded-full flex items-center justify-center text-white font-bold text-2xl">
            PG
          </div>
        </div>
        <span className="gradient-heading">Prince Group</span>
      </div>
    </Link>
  );
};

export default Logo;
