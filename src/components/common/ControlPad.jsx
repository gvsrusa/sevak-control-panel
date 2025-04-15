import React, { useState } from 'react';
import Button from './Button';

const ControlPad = ({ onDirectionChange, onSpeedChange, disabled, className }) => {
  const [activeDirection, setActiveDirection] = useState(null);
  const [speed, setSpeed] = useState(50); // 0-100% speed

  const handleDirectionClick = (direction) => {
    if (disabled) return;
    
    setActiveDirection(direction);
    onDirectionChange(direction);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value, 10);
    setSpeed(newSpeed);
    onSpeedChange(newSpeed);
  };

  const directionButtons = [
    { direction: 'forward', icon: 'M5 10l7-7m0 0l7 7m-7-7v18', label: 'Forward' },
    { direction: 'left', icon: 'M10 19l-7-7m0 0l7-7m-7 7h18', label: 'Left' },
    { direction: 'stop', icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Stop' },
    { direction: 'right', icon: 'M14 5l7 7m0 0l-7 7m7-7H3', label: 'Right' },
    { direction: 'reverse', icon: 'M19 14l-7 7m0 0l-7-7m7 7V3', label: 'Reverse' },
  ];

  // Determine position for each button in the grid
  const positionClasses = {
    forward: 'col-start-2',
    left: 'col-start-1 row-start-2',
    stop: 'col-start-2 row-start-2',
    right: 'col-start-3 row-start-2',
    reverse: 'col-start-2 row-start-3',
  };

  return (
    <div className={`${className || ''}`}>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 mb-4">
        {directionButtons.map((btn) => (
          <Button
            key={btn.direction}
            onClick={() => handleDirectionClick(btn.direction)}
            className={`
              ${positionClasses[btn.direction]} 
              ${activeDirection === btn.direction ? 'bg-blue-700 ring-2 ring-blue-500' : 'bg-blue-500'} 
              text-white h-16 w-16 flex items-center justify-center rounded-full
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}
            `}
            disabled={disabled}
            aria-label={btn.label}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={btn.icon} />
            </svg>
          </Button>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.388,9.624h-3.011v-3.01c0-0.208-0.168-0.377-0.376-0.377S9.624,6.405,9.624,6.613v3.01H6.613c-0.208,0-0.376,0.168-0.376,0.376s0.168,0.376,0.376,0.376h3.011v3.01c0,0.208,0.168,0.378,0.376,0.378s0.376-0.17,0.376-0.378v-3.01h3.011c0.207,0,0.377-0.168,0.377-0.376S13.595,9.624,13.388,9.624z M10,1.344c-4.781,0-8.656,3.875-8.656,8.656c0,4.781,3.875,8.656,8.656,8.656c4.781,0,8.656-3.875,8.656-8.656C18.656,5.219,14.781,1.344,10,1.344z M10,17.903c-4.365,0-7.904-3.538-7.904-7.903S5.635,2.096,10,2.096S17.903,5.635,17.903,10S14.365,17.903,10,17.903z" />
          </svg>
          <div className="w-full mx-2">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={speed}
              onChange={handleSpeedChange}
              disabled={disabled}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12,2.172c-5.422,0-9.828,4.405-9.828,9.828s4.406,9.828,9.828,9.828s9.828-4.405,9.828-9.828S17.422,2.172,12,2.172z M12,21.078c-5.01,0-9.078-4.067-9.078-9.078c0-5.01,4.068-9.078,9.078-9.078c5.012,0,9.078,4.067,9.078,9.078C21.078,17.011,17.012,21.078,12,21.078z M16.748,7.382c-0.226-0.224-0.59-0.224-0.816,0l-3.939,3.925l-0.398-0.398c-0.226-0.224-0.59-0.224-0.816,0c-0.226,0.226-0.226,0.59,0,0.816l0.398,0.398l-2.359,2.352c-0.226,0.225-0.226,0.59,0,0.814c0.112,0.113,0.26,0.169,0.408,0.169c0.147,0,0.295-0.056,0.408-0.169l2.359-2.352l0.398,0.397c0.112,0.113,0.26,0.169,0.408,0.169c0.147,0,0.295-0.056,0.408-0.169c0.226-0.225,0.226-0.59,0-0.814l-0.398-0.398l3.939-3.925C16.974,7.972,16.974,7.607,16.748,7.382z" />
          </svg>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Slow</span>
          <span>Speed: {speed}%</span>
          <span>Fast</span>
        </div>
      </div>
    </div>
  );
};

export default ControlPad;