// src/context/OfflineContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create context
export const OfflineContext = createContext();

export const OfflineProvider = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false);
  const [pendingOperations, setPendingOperations] = useState([]);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Monitor online/offline status
  useEffect(() => {
    const handleStatusChange = () => {
      const offline = !navigator.onLine;
      setIsOffline(offline);
      
      if (!offline && pendingOperations.length > 0) {
        // When coming back online, sync pending operations
        syncPendingOperations();
      }
    };

    // Initial check
    handleStatusChange();

    // Add event listeners
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    // Clean up
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [pendingOperations]);

  // Function to sync pending operations when back online
  const syncPendingOperations = async () => {
    if (pendingOperations.length === 0) return;

    try {
      console.log('Syncing pending operations:', pendingOperations.length);
      
      // For prototype, we'll just simulate syncing
      // In a real implementation, this would call the API to sync each operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear pending operations
      setPendingOperations([]);
      
      // Update last sync time
      setLastSyncTime(new Date());
      
      console.log('Sync complete');
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  // Queue an operation to be performed when back online
  const queueOperation = (operation) => {
    setPendingOperations(prev => [...prev, {
      ...operation,
      timestamp: new Date(),
      id: `op-${Date.now()}`
    }]);
  };

  // Execute an operation with offline support
  const executeOperation = async (operationFn, offlineFallback, operationData) => {
    try {
      if (isOffline) {
        // If offline, use fallback and queue for later
        const result = offlineFallback(operationData);
        
        queueOperation({
          type: operationData.type,
          data: operationData,
          fallbackResult: result
        });
        
        return { success: true, result, isOfflineResult: true };
      } else {
        // If online, execute normally
        const result = await operationFn(operationData);
        return { success: true, result, isOfflineResult: false };
      }
    } catch (error) {
      console.error('Operation failed:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <OfflineContext.Provider 
      value={{
        isOffline,
        pendingOperations,
        lastSyncTime,
        queueOperation,
        executeOperation,
        syncPendingOperations
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};