import React from 'react';

const BatteryIndicator = ({ level, isCharging, estimatedRuntime }) => {
  // Determine color based on battery level
  let fillColor = '';
  if (level <= 20) {
    fillColor = 'bg-red-500';
  } else if (level <= 40) {
    fillColor = 'bg-yellow-500';
  } else {
    fillColor = 'bg-green-500';
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-12 border-2 border-gray-700 rounded-md overflow-hidden">
        <div 
            className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in-out ${fillColor}`}
            style={{ height: `${level}%` }}>
        </div>
        {isCharging && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white drop-shadow-md">{level}%</span>
        </div>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 h-2 w-4 bg-gray-700 rounded-t-sm"></div>
      </div>
      {estimatedRuntime && (
        <div className="mt-2 text-sm text-center">
          <span className="font-medium">{estimatedRuntime} min</span>
          <div className="text-xs text-gray-500">remaining</div>
        </div>
      )}
    </div>
  );
};

export default BatteryIndicator;