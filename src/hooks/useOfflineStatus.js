// src/hooks/useOfflineStatus.js
import { useContext, useCallback } from 'react';
import { OfflineContext } from '../context/OfflineContext';
import { offlineService } from '../services/offlineService';

/**
 * Hook to manage offline functionality
 * @returns {object} Offline status and management functions
 */
const useOfflineStatus = () => {
  const { 
    isOffline, 
    pendingOperations, 
    lastSyncTime, 
    queueOperation, 
    executeOperation,
    syncPendingOperations 
  } = useContext(OfflineContext);

  /**
   * Clear cached data
   * @param {string} key - Optional key to clear specific data
   * @returns {Promise<boolean>} Success status
   */
  const clearCache = useCallback(async (key = null) => {
    return await offlineService.clearCache(key);
  }, []);

  /**
   * Get number of pending operations
   * @returns {number} Count of pending operations
   */
  const getPendingCount = useCallback(() => {
    return pendingOperations.length;
  }, [pendingOperations]);

  /**
   * Check if we have connectivity
   * @returns {boolean} True if online
   */
  const checkConnectivity = useCallback(() => {
    return navigator.onLine;
  }, []);

  /**
   * Format the last sync time as a string
   * @returns {string} Formatted time
   */
  const getLastSyncTimeFormatted = useCallback(() => {
    if (!lastSyncTime) return 'Never';
    
    try {
      const options = { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      return new Date(lastSyncTime).toLocaleString(undefined, options);
    } catch (e) {
      return 'Unknown';
    }
  }, [lastSyncTime]);

  /**
   * Execute an operation with offline support
   * @param {function} onlineFunction - Function to execute when online
   * @param {function} offlineFallback - Function to execute when offline
   * @param {any} data - Data for the operation
   * @returns {Promise<any>} Operation result
   */
  const executeWithOfflineSupport = useCallback(async (onlineFunction, offlineFallback, data) => {
    return executeOperation(onlineFunction, offlineFallback, data);
  }, [executeOperation]);

  return {
    isOffline,
    pendingOperations,
    lastSyncTime,
    lastSyncFormatted: getLastSyncTimeFormatted(),
    pendingCount: getPendingCount(),
    
    // Methods
    queueOperation,
    syncPendingOperations,
    clearCache,
    checkConnectivity,
    executeWithOfflineSupport
  };
};

export default useOfflineStatus;