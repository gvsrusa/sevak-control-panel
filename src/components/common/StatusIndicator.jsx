import React from 'react';

const StatusIndicator = ({ status, label, className }) => {
  // Status can be: 'operational', 'standby', 'error', 'offline'
  const statusConfig = {
    operational: {
      color: 'bg-green-500',
      pulseEffect: 'animate-pulse',
    },
    standby: {
      color: 'bg-yellow-500',
      pulseEffect: '',
    },
    error: {
      color: 'bg-red-500',
      pulseEffect: 'animate-pulse',
    },
    offline: {
      color: 'bg-gray-500',
      pulseEffect: '',
    },
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`h-3 w-3 rounded-full ${config.color} ${config.pulseEffect} mr-2`}></div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default StatusIndicator;