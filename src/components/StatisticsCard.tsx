
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
    <div className={`stats-card ${variant === 'blue' ? 'stats-card-blue' : 'stats-card-green'} ${className}`}>
      <div className={`glow-effect ${variant === 'blue' ? 'glow-blue' : 'glow-green'}`}></div>
      <div className={`stats-value ${variant === 'green' ? 'stats-value-green' : ''}`}>
        {value}
      </div>
      <div className="stats-label">
        {label}
      </div>
    </div>
  );
};

export default StatisticsCard;
