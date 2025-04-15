// src/hooks/useTractorStatus.js
import { useState, useEffect, useContext } from 'react';
import { TractorContext } from '../context/TractorContext';
import { OfflineContext } from '../context/OfflineContext';
import { tractorService } from '../services/tractorService';

/**
 * Hook to get and monitor tractor status
 * @param {string} tractorId - ID of the tractor
 * @returns {object} Tractor status and control functions
 */
const useTractorStatus = (tractorId = 'sevak-001') => {
  const { 
    tractorStatus, 
    tractorLocation, 
    sendDirectionCommand, 
    sendSpeedCommand,
    toggleOperation,
    triggerOperation,
    triggerEmergencyStop 
  } = useContext(TractorContext);
  
  const { isOffline } = useContext(OfflineContext);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [diagnostics, setDiagnostics] = useState(null);

  // Fetch diagnostics on mount and periodically
  useEffect(() => {
    const fetchDiagnostics = async () => {
      try {
        if (!isOffline) {
          const data = await tractorService.getDiagnostics(tractorId);
          setDiagnostics(data);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching tractor diagnostics:', err);
        setError('Failed to load tractor diagnostics');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchDiagnostics();

    // Set up polling every 60 seconds if online
    const interval = setInterval(() => {
      if (!isOffline) {
        fetchDiagnostics();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [tractorId, isOffline]);

  // Combine status and diagnostics
  const enhancedStatus = {
    ...tractorStatus,
    diagnostics,
    location: tractorLocation,
  };

  return {
    status: enhancedStatus,
    location: tractorLocation,
    loading,
    error,
    isOffline,
    
    // Control methods
    sendDirection: sendDirectionCommand,
    sendSpeed: sendSpeedCommand,
    toggleOperation,
    startOperation: triggerOperation,
    emergencyStop: triggerEmergencyStop,
  };
};

export default useTractorStatus;