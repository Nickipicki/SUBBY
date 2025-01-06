import React from 'react';

interface StepIndicatorProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export const StepIndicator = ({ isActive, onClick }: StepIndicatorProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-3 h-3 rounded-full transition-all duration-300 ${
        isActive 
          ? 'bg-purple-500 w-6' 
          : 'bg-gray-600 hover:bg-gray-500'
      }`}
    />
  );
}; 