// src/services/api.js
/**
 * API service for handling HTTP requests to the backend
 */

// Base API URL - would come from environment variables in a real app
const API_BASE_URL = 'https://api.sevak.example.com/v1';

// Default request headers
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Helper function to handle HTTP errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    error.status = response.status;
    error.response = response;
    error.data = errorData;
    throw error;
  }
  
  // If response is 204 No Content, return null
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

// Get auth token from local storage
const getAuthToken = () => {
  return localStorage.getItem('sevak_token');
};

// API request methods
export const api = {
  /**
   * Send a GET request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Additional options
   * @returns {Promise<any>} Response data
   */
  get: async (endpoint, options = {}) => {
    const token = getAuthToken();
    const headers = {
      ...defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
      ...options,
    });
    
    return handleResponse(response);
  },
  
  /**
   * Send a POST request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request payload
   * @param {object} options - Additional options
   * @returns {Promise<any>} Response data
   */
  post: async (endpoint, data, options = {}) => {
    const token = getAuthToken();
    const headers = {
      ...defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      ...options,
    });
    
    return handleResponse(response);
  },
  
  /**
   * Send a PUT request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request payload
   * @param {object} options - Additional options
   * @returns {Promise<any>} Response data
   */
  put: async (endpoint, data, options = {}) => {
    const token = getAuthToken();
    const headers = {
      ...defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
      ...options,
    });
    
    return handleResponse(response);
  },
  
  /**
   * Send a DELETE request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Additional options
   * @returns {Promise<any>} Response data
   */
  delete: async (endpoint, options = {}) => {
    const token = getAuthToken();
    const headers = {
      ...defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
      ...options,
    });
    
    return handleResponse(response);
  },
  
  /**
   * Upload a file
   * @param {string} endpoint - API endpoint
   * @param {FormData} formData - Form data with files
   * @param {object} options - Additional options
   * @returns {Promise<any>} Response data
   */
  uploadFile: async (endpoint, formData, options = {}) => {
    const token = getAuthToken();
    const headers = {
      // Don't include Content-Type, let the browser set it with the correct boundary
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
      ...options,
    });
    
    return handleResponse(response);
  }
};