import React from 'react';
import { Link } from 'react-router-dom';

// A much simpler Logo implementation for Safari compatibility
const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="h-12 flex items-center mr-2">
        {/* Static image with minimal styling for Safari */}
        <img 
          src="/teal-cg-logo.png" 
          alt="Prince Group Logo" 
          className="safari-image-fix"
          style={{ 
            maxHeight: '40px', 
            maxWidth: '100%',
            display: 'block',
            visibility: 'visible',
            opacity: 1
          }}
        />
      </div>
    </Link>
  );
};

export default Logo;
