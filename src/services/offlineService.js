// src/services/offlineService.js
/**
 * Service to handle offline functionality and data synchronization
 */

// Initialize IndexedDB for offline storage
const initIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('sevak_offline_db', 1);
    
    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create object stores
      if (!db.objectStoreNames.contains('cached_data')) {
        db.createObjectStore('cached_data', { keyPath: 'key' });
      }
      
      if (!db.objectStoreNames.contains('pending_operations')) {
        db.createObjectStore('pending_operations', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

// Get IndexedDB instance
let dbPromise = null;
const getDB = () => {
  if (!dbPromise) {
    dbPromise = initIndexedDB();
  }
  return dbPromise;
};

export const offlineService = {
  /**
   * Cache data for offline use
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   * @returns {Promise<void>}
   */
  cacheData: async (key, data) => {
    try {
      const db = await getDB();
      const transaction = db.transaction(['cached_data'], 'readwrite');
      const store = transaction.objectStore('cached_data');
      
      await store.put({
        key,
        data,
        timestamp: Date.now()
      });
      
      return true;
    } catch (error) {
      console.error('Failed to cache data:', error);
      return false;
    }
  },
  
  /**
   * Get cached data by key
   * @param {string} key - Cache key
   * @returns {Promise<any>} Cached data or null if not found
   */
  getCachedData: async (key) => {
    try {
      const db = await getDB();
      const transaction = db.transaction(['cached_data'], 'readonly');
      const store = transaction.objectStore('cached_data');
      const request = store.get(key);
      
      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const result = request.result;
          if (result) {
            resolve(result.data);
          } else {
            resolve(null);
          }
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Failed to get cached data:', error);
      return null;
    }
  },
  
  /**
   * Clear cached data
   * @param {string} key - Optional key to clear specific data
   * @returns {Promise<boolean>} Success status
   */
  clearCache: async (key = null) => {
    try {
      const db = await getDB();
      const transaction = db.transaction(['cached_data'], 'readwrite');
      const store = transaction.objectStore('cached_data');
      
      if (key) {
        await store.delete(key);
      } else {
        await store.clear();
      }
      
      return true;
    } catch (error) {
      console.error('Failed to clear cache:', error);
      return false;
    }
  },
  
  /**
   * Queue operation for later execution when online
   * @param {object} operation - Operation details
   * @returns {Promise<boolean>} Success status
   */
  queueOperation: async (operation) => {
    try {
      const db = await getDB();
      const transaction = db.transaction(['pending_operations'], 'readwrite');
      const store = transaction.objectStore('pending_operations');
      
      const operationWithTimestamp = {
        ...operation,
        timestamp: Date.now(),
        status: 'pending'
      };
      
      await store.add(operationWithTimestamp);
      
      return true;
    } catch (error) {
      console.error('Failed to queue operation:', error);
      return false;
    }
  },
  
  /**
   * Get all pending operations
   * @returns {Promise<Array>} List of pending operations
   */
  getPendingOperations: async () => {
    try {
      const db = await getDB();
      const transaction = db.transaction(['pending_operations'], 'readonly');
      const store = transaction.objectStore('pending_operations');
      const request = store.getAll();
      
      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          resolve(request.result);
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Failed to get pending operations:', error);
      return [];
    }
  },
  
  /**
   * Mark operation as completed
   * @param {number} id - Operation ID
   * @returns {Promise<boolean>} Success status
   */
  markOperationComplete: async (id) => {
    try {
      const db = await getDB();
      const transaction = db.transaction(['pending_operations'], 'readwrite');
      const store = transaction.objectStore('pending_operations');
      
      // Get the operation first
      const getRequest = store.get(id);
      
      return new Promise((resolve, reject) => {
        getRequest.onsuccess = () => {
          const operation = getRequest.result;
          if (!operation) {
            resolve(false);
            return;
          }
          
          // Update status
          operation.status = 'completed';
          operation.completedAt = Date.now();
          
          // Put back the updated operation
          const putRequest = store.put(operation);
          
          putRequest.onsuccess = () => {
            resolve(true);
          };
          
          putRequest.onerror = () => {
            reject(putRequest.error);
          };
        };
        
        getRequest.onerror = () => {
          reject(getRequest.error);
        };
      });
    } catch (error) {
      console.error('Failed to mark operation as complete:', error);
      return false;
    }
  },
  
  /**
   * Remove completed operations
   * @returns {Promise<number>} Number of operations removed
   */
  clearCompletedOperations: async () => {
    try {
      const db = await getDB();
      const transaction = db.transaction(['pending_operations'], 'readwrite');
      const store = transaction.objectStore('pending_operations');
      
      // Get all operations
      const request = store.openCursor();
      let count = 0;
      
      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          const cursor = event.target.result;
          
          if (cursor) {
            const operation = cursor.value;
            
            if (operation.status === 'completed') {
              const deleteRequest = cursor.delete();
              deleteRequest.onsuccess = () => {
                count++;
              };
            }
            
            cursor.continue();
          } else {
            resolve(count);
          }
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Failed to clear completed operations:', error);
      return 0;
    }
  },
  
  /**
   * Sync all pending operations with the server
   * @returns {Promise<object>} Sync results
   */
  syncPendingOperations: async () => {
    try {
      // Get all pending operations
      const pendingOperations = await offlineService.getPendingOperations();
      
      if (pendingOperations.length === 0) {
        return { success: true, synced: 0, failed: 0 };
      }
      
      const results = {
        success: true,
        synced: 0,
        failed: 0,
        failures: []
      };
      
      // Process operations in order
      for (const operation of pendingOperations) {
        if (operation.status !== 'pending') continue;
        
        try {
          // Process based on operation type
          // In a real implementation, this would call the appropriate API endpoints
          console.log(`Syncing operation: ${operation.type}`);
          
          // Mark as completed
          await offlineService.markOperationComplete(operation.id);
          results.synced++;
        } catch (error) {
          console.error(`Failed to sync operation ${operation.id}:`, error);
          results.failed++;
          results.failures.push({
            operationId: operation.id,
            type: operation.type,
            error: error.message
          });
        }
      }
      
      return results;
    } catch (error) {
      console.error('Failed to sync pending operations:', error);
      return { success: false, error: error.message };
    }
  }
};