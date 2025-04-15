import React, { createContext, useState, useEffect } from 'react';

// Create context
export const TractorContext = createContext();

export const TractorProvider = ({ children }) => {
  // Tractor state
  const [tractorStatus, setTractorStatus] = useState({
    id: 'sevak-001',
    status: 'standby', // 'operational', 'standby', 'error', 'offline'
    operationMode: null, // 'cutting', 'loading', 'transport', null
    batteryLevel: 78,
    isCharging: false,
    estimatedRuntime: 240, // minutes
    direction: null, // 'forward', 'reverse', 'left', 'right', null
    speed: 0, // 0-100%
  });

  // Location data
  const [tractorLocation, setTractorLocation] = useState({
    latitude: 18.5204,
    longitude: 73.8567,
    heading: 90, // degrees
    timestamp: new Date(),
  });

  // Field boundaries
  const [fieldBoundaries, setFieldBoundaries] = useState([]);

  // Scheduled tasks
  const [allTasks, setAllTasks] = useState([
    {
      id: 't1',
      title: 'Morning Fodder Collection',
      type: 'cutting',
      status: 'scheduled',
      scheduledTime: new Date(new Date().setHours(6, 0, 0, 0)).toISOString(),
      duration: 60,
      recurring: 'daily',
    },
    {
      id: 't2',
      title: 'Transport to Barn',
      type: 'transport',
      status: 'scheduled',
      scheduledTime: new Date(new Date().setHours(7, 30, 0, 0)).toISOString(),
      duration: 45,
      recurring: 'daily',
    }
  ]);

  // Upcoming tasks - derived from all tasks
  const upcomingTasks = allTasks.filter(task => 
    task.status === 'scheduled' && 
    new Date(task.scheduledTime) > new Date()
  ).sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));

  // In a real implementation, we would connect to a WebSocket for real-time updates
  // For this prototype, we'll simulate intermittent status updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate battery drain
      if (!tractorStatus.isCharging && tractorStatus.batteryLevel > 0) {
        setTractorStatus(prev => ({
          ...prev,
          batteryLevel: Math.max(0, prev.batteryLevel - 0.01),
          estimatedRuntime: Math.floor((prev.batteryLevel - 0.01) * 3), // simple estimation
        }));
      }
      
      // Simulate location changes if operational
      if (tractorStatus.status === 'operational') {
        setTractorLocation(prev => {
          const jitter = 0.0001; // Small random movement
          return {
            ...prev,
            latitude: prev.latitude + (Math.random() - 0.5) * jitter,
            longitude: prev.longitude + (Math.random() - 0.5) * jitter,
            heading: (prev.heading + Math.random() * 5) % 360,
            timestamp: new Date(),
          };
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [tractorStatus]);

  // Control functions
  const sendDirectionCommand = (direction) => {
    console.log('Sending direction command:', direction);
    setTractorStatus(prev => ({
      ...prev,
      direction,
      status: direction === 'stop' ? 'standby' : 'operational',
    }));
  };

  const sendSpeedCommand = (speed) => {
    console.log('Sending speed command:', speed);
    setTractorStatus(prev => ({
      ...prev,
      speed,
    }));
  };

  const toggleOperation = (operationType) => {
    console.log('Toggling operation:', operationType);
    setTractorStatus(prev => ({
      ...prev,
      operationMode: prev.operationMode === operationType ? null : operationType,
      status: 'operational',
    }));
  };

  const triggerOperation = (operationType) => {
    console.log('Triggering operation:', operationType);
    
    if (operationType === 'returnHome') {
      // Simulate return to home
      setTractorStatus(prev => ({
        ...prev,
        status: 'operational',
        operationMode: 'transport',
        direction: 'forward',
        speed: 50,
      }));
      
      // After some "travel" time, return to standby
      setTimeout(() => {
        setTractorStatus(prev => ({
          ...prev,
          status: 'standby',
          operationMode: null,
          direction: null,
          speed: 0,
        }));
      }, 5000);
      return;
    }
    
    setTractorStatus(prev => ({
      ...prev,
      status: 'operational',
      operationMode: operationType,
    }));
  };

  const triggerEmergencyStop = () => {
    console.log('EMERGENCY STOP TRIGGERED');
    setTractorStatus(prev => ({
      ...prev,
      status: 'standby',
      operationMode: null,
      direction: null,
      speed: 0,
    }));
  };

  // Task management
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: `t${Date.now()}`,
      status: 'scheduled',
    };
    setAllTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskId, updates) => {
    setAllTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setAllTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // Derived state
  const isTractorBusy = tractorStatus.status === 'operational';

  return (
    <TractorContext.Provider
      value={{
        tractorStatus,
        tractorLocation,
        fieldBoundaries,
        allTasks,
        upcomingTasks,
        isTractorBusy,
        
        // Control methods
        sendDirectionCommand,
        sendSpeedCommand,
        toggleOperation,
        triggerOperation,
        triggerEmergencyStop,
        
        // Task management
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TractorContext.Provider>
  );
};