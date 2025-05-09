
import React from 'react';

interface StatisticsCardProps {
  value: string;
  label: string;
  variant?: 'blue' | 'green';
  className?: string;
}

const StatisticsCard = ({ 
  value, 
  label, 
  variant = 'blue',
  className = '' 
}: StatisticsCardProps) => {
  return (
    <div className={`relative overflow-hidden rounded-xl p-6 shadow-lg ${
      variant === 'blue' ? 'bg-gradient-to-br from-ui-blue-500 to-ui-blue-600 text-white' : 
      'bg-gradient-to-br from-ui-green-500 to-ui-green-600 text-white'
    } ${className}`}>
      <div className={`absolute top-0 left-0 right-0 bottom-0 opacity-10 ${
        variant === 'blue' ? 'bg-ui-blue-300' : 'bg-ui-green-300'
      } blur-3xl rounded-full -translate-y-1/2 translate-x-1/4`}></div>
      
      <div className="relative z-10">
        <div className={`text-3xl font-bold mb-1`}>
          {value}
        </div>
        <div className="text-sm opacity-90">
          {label}
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
