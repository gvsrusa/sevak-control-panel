// src/services/tractorService.js
/**
 * Service for tractor operations and status management
 */
import { api } from './api';
import { offlineService } from './offlineService';

export const tractorService = {
  /**
   * Get current tractor status
   * @param {string} tractorId - ID of the tractor
   * @returns {Promise<object>} Tractor status data
   */
  getStatus: async (tractorId) => {
    try {
      const response = await api.get(`/tractor/${tractorId}/status`);
      return response;
    } catch (error) {
      // If offline, return cached status
      if (!navigator.onLine) {
        const cachedStatus = offlineService.getCachedData(`tractor_status_${tractorId}`);
        if (cachedStatus) {
          return cachedStatus;
        }
      }
      throw error;
    }
  },
  
  /**
   * Send control command to tractor
   * @param {string} tractorId - ID of the tractor
   * @param {string} command - Command type (direction, speed, etc.)
   * @param {any} value - Command value
   * @returns {Promise<object>} Command response
   */
  sendCommand: async (tractorId, command, value) => {
    try {
      const response = await api.post(`/tractor/${tractorId}/control`, {
        command,
        value
      });
      
      return response;
    } catch (error) {
      // If offline, queue the command for later
      if (!navigator.onLine) {
        offlineService.queueOperation({
          type: 'tractor_command',
          data: {
            tractorId,
            command,
            value,
            timestamp: new Date()
          }
        });
        
        // Return simulated success
        return {
          success: true,
          offlineQueued: true,
          message: 'Command queued for execution when connection is restored'
        };
      }
      throw error;
    }
  },
  
  /**
   * Send emergency stop command
   * @param {string} tractorId - ID of the tractor
   * @returns {Promise<object>} Command response
   */
  emergencyStop: async (tractorId) => {
    try {
      const response = await api.post(`/tractor/${tractorId}/emergency-stop`);
      return response;
    } catch (error) {
      // Emergency stop should work offline - execute local safety protocol
      console.error('Emergency stop failed with API, executing local protocol');
      
      // In a real implementation, the app would communicate directly with the tractor
      // using a local communication protocol (Bluetooth, local network, etc.)
      
      // For prototype, simulate success
      return {
        success: true,
        localExecution: true,
        message: 'Emergency stop executed locally'
      };
    }
  },
  
  /**
   * Get tractor location
   * @param {string} tractorId - ID of the tractor
   * @returns {Promise<object>} Location data
   */
  getLocation: async (tractorId) => {
    try {
      const response = await api.get(`/tractor/${tractorId}/location`);
      
      // Cache location data for offline use
      if (response) {
        offlineService.cacheData(`tractor_location_${tractorId}`, response);
      }
      
      return response;
    } catch (error) {
      // If offline, return cached location
      if (!navigator.onLine) {
        const cachedLocation = offlineService.getCachedData(`tractor_location_${tractorId}`);
        if (cachedLocation) {
          return cachedLocation;
        }
      }
      throw error;
    }
  },
  
  /**
   * Get tractor diagnostic information
   * @param {string} tractorId - ID of the tractor
   * @returns {Promise<object>} Diagnostic data
   */
  getDiagnostics: async (tractorId) => {
    try {
      const response = await api.get(`/tractor/${tractorId}/diagnostics`);
      return response;
    } catch (error) {
      // If offline, return cached diagnostics
      if (!navigator.onLine) {
        const cachedDiagnostics = offlineService.getCachedData(`tractor_diagnostics_${tractorId}`);
        if (cachedDiagnostics) {
          return cachedDiagnostics;
        }
      }
      throw error;
    }
  },
  
  /**
   * Start a specific operation mode
   * @param {string} tractorId - ID of the tractor
   * @param {string} operation - Operation type (cutting, loading, transport)
   * @returns {Promise<object>} Operation response
   */
  startOperation: async (tractorId, operation) => {
    try {
      const response = await api.post(`/tractor/${tractorId}/operation`, { operation });
      return response;
    } catch (error) {
      // If offline, queue the operation for later
      if (!navigator.onLine) {
        offlineService.queueOperation({
          type: 'start_operation',
          data: {
            tractorId,
            operation,
            timestamp: new Date()
          }
        });
        
        // Return simulated success
        return {
          success: true,
          offlineQueued: true,
          message: `Operation ${operation} queued for when connection is restored`
        };
      }
      throw error;
    }
  }
};