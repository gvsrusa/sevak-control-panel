// src/services/schedulerService.js
/**
 * Service for managing scheduled tasks for the Sevak tractor
 */
import { api } from './api';
import { offlineService } from './offlineService';

export const schedulerService = {
  /**
   * Get all tasks for a tractor
   * @param {string} tractorId - ID of the tractor
   * @returns {Promise<array>} List of tasks
   */
  getAllTasks: async (tractorId) => {
    try {
      const response = await api.get(`/tasks?tractorId=${tractorId}`);
      
      // Cache tasks for offline use
      if (response) {
        offlineService.cacheData(`tractor_tasks_${tractorId}`, response);
      }
      
      return response;
    } catch (error) {
      // If offline, return cached tasks
      if (!navigator.onLine) {
        const cachedTasks = await offlineService.getCachedData(`tractor_tasks_${tractorId}`);
        if (cachedTasks) {
          return cachedTasks;
        }
      }
      throw error;
    }
  },
  
  /**
   * Create a new task
   * @param {object} taskData - Task details
   * @returns {Promise<object>} Created task
   */
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response;
    } catch (error) {
      // If offline, queue the task creation
      if (!navigator.onLine) {
        const taskWithId = {
          ...taskData,
          id: `offline_${Date.now()}`,
          status: 'scheduled',
          createdAt: new Date().toISOString()
        };
        
        offlineService.queueOperation({
          type: 'create_task',
          data: taskData,
          localResult: taskWithId
        });
        
        // Return the local version
        return taskWithId;
      }
      throw error;
    }
  },
  
  /**
   * Get a specific task
   * @param {string} taskId - Task ID
   * @returns {Promise<object>} Task details
   */
  getTask: async (taskId) => {
    try {
      // If it's an offline-created task
      if (taskId.startsWith('offline_')) {
        const pendingOperations = await offlineService.getPendingOperations();
        const taskOperation = pendingOperations.find(
          op => op.type === 'create_task' && op.localResult.id === taskId
        );
        
        if (taskOperation) {
          return taskOperation.localResult;
        }
      }
      
      const response = await api.get(`/tasks/${taskId}`);
      return response;
    } catch (error) {
      // If offline, look for cached task
      if (!navigator.onLine) {
        const cachedTasks = await offlineService.getCachedData('all_tasks');
        if (cachedTasks) {
          const task = cachedTasks.find(t => t.id === taskId);
          if (task) return task;
        }
      }
      throw error;
    }
  },
  
  /**
   * Update a task
   * @param {string} taskId - Task ID
   * @param {object} updates - Task data to update
   * @returns {Promise<object>} Updated task
   */
  updateTask: async (taskId, updates) => {
    try {
      // Handle offline-created tasks
      if (taskId.startsWith('offline_')) {
        const pendingOperations = await offlineService.getPendingOperations();
        const taskOperation = pendingOperations.find(
          op => op.type === 'create_task' && op.localResult.id === taskId
        );
        
        if (taskOperation) {
          // Update the local result
          taskOperation.localResult = {
            ...taskOperation.localResult,
            ...updates,
            updatedAt: new Date().toISOString()
          };
          
          // Queue an update operation for when online
          offlineService.queueOperation({
            type: 'update_task',
            data: {
              originalTask: taskOperation.data,
              updates
            },
            localResult: taskOperation.localResult
          });
          
          return taskOperation.localResult;
        }
      }
      
      const response = await api.put(`/tasks/${taskId}`, updates);
      return response;
    } catch (error) {
      // If offline, queue the update
      if (!navigator.onLine) {
        // Get cached task first
        const cachedTasks = await offlineService.getCachedData('all_tasks');
        let taskToUpdate = null;
        
        if (cachedTasks) {
          taskToUpdate = cachedTasks.find(t => t.id === taskId);
        }
        
        if (taskToUpdate) {
          // Update local version
          const updatedTask = {
            ...taskToUpdate,
            ...updates,
            updatedAt: new Date().toISOString()
          };
          
          // Queue the update for later
          offlineService.queueOperation({
            type: 'update_task',
            data: {
              taskId,
              updates
            },
            localResult: updatedTask
          });
          
          return updatedTask;
        }
      }
      throw error;
    }
  },
  
  /**
   * Delete a task
   * @param {string} taskId - Task ID
   * @returns {Promise<object>} Response
   */
  deleteTask: async (taskId) => {
    try {
      // Handle offline-created tasks
      if (taskId.startsWith('offline_')) {
        const pendingOperations = await offlineService.getPendingOperations();
        const taskIndex = pendingOperations.findIndex(
          op => op.type === 'create_task' && op.localResult.id === taskId
        );
        
        if (taskIndex !== -1) {
          // Mark the operation as completed (effectively cancelling it)
          await offlineService.markOperationComplete(pendingOperations[taskIndex].id);
          return { success: true, message: 'Task deletion queued' };
        }
      }
      
      const response = await api.delete(`/tasks/${taskId}`);
      return response;
    } catch (error) {
      // If offline, queue the deletion
      if (!navigator.onLine) {
        offlineService.queueOperation({
          type: 'delete_task',
          data: {
            taskId
          }
        });
        
        return { success: true, message: 'Task deletion queued' };
      }
      throw error;
    }
  },
  
  /**
   * Execute a scheduled task now
   * @param {string} taskId - Task ID
   * @returns {Promise<object>} Response
   */
  executeTask: async (taskId) => {
    try {
      const response = await api.post(`/tasks/${taskId}/execute`);
      return response;
    } catch (error) {
      // If offline, queue the execution
      if (!navigator.onLine) {
        offlineService.queueOperation({
          type: 'execute_task',
          data: {
            taskId
          }
        });
        
        return { 
          success: true, 
          message: 'Task execution queued for when connection is restored',
          offlineQueued: true
        };
      }
      throw error;
    }
  }
};