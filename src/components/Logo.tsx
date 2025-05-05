
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="text-2xl font-bold text-prince-green flex items-center">
        <div className="h-10 w-10 relative mr-2">
          <div className="absolute inset-0 bg-prince-green rounded-full flex items-center justify-center text-white font-bold text-2xl">
            PG
          </div>
        </div>
        <span>Prince Group</span>
      </div>
    </div>
  );
};

export default Logo;
