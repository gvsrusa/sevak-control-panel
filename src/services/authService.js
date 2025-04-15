// src/services/authService.js
/**
 * Authentication service for user login, registration, and management
 */
import { api } from './api';

export const authService = {
  /**
   * Log in with phone number and OTP
   * @param {string} phoneNumber - User's phone number
   * @param {string} otp - One-time password
   * @returns {Promise<object>} Authentication response with user data and token
   */
  login: async (phoneNumber, otp) => {
    try {
      const response = await api.post('/auth/otp/verify', { phoneNumber, otp });
      
      if (response.token) {
        localStorage.setItem('sevak_token', response.token);
        localStorage.setItem('sevak_user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  /**
   * Generate OTP for phone verification
   * @param {string} phoneNumber - User's phone number
   * @returns {Promise<object>} Response data
   */
  generateOtp: async (phoneNumber) => {
    try {
      const response = await api.post('/auth/otp/generate', { phoneNumber });
      return response;
    } catch (error) {
      console.error('OTP generation failed:', error);
      throw error;
    }
  },
  
  /**
   * Log out current user
   * @returns {Promise<object>} Response data
   */
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      localStorage.removeItem('sevak_token');
      localStorage.removeItem('sevak_user');
      return response;
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, clear local storage
      localStorage.removeItem('sevak_token');
      localStorage.removeItem('sevak_user');
      throw error;
    }
  },
  
  /**
   * Refresh authentication token
   * @returns {Promise<object>} Response with new token
   */
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      
      if (response.token) {
        localStorage.setItem('sevak_token', response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  },
  
  /**
   * Check if user is authenticated
   * @returns {Promise<boolean>} Authentication status
   */
  checkAuth: async () => {
    try {
      const token = localStorage.getItem('sevak_token');
      
      if (!token) {
        return false;
      }
      
      const response = await api.get('/auth/status');
      return response.isAuthenticated;
    } catch (error) {
      console.error('Auth check failed:', error);
      return false;
    }
  },
  
  /**
   * Get current user profile
   * @returns {Promise<object>} User profile data
   */
  getUserProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      return response;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      throw error;
    }
  },
  
  /**
   * Update user profile
   * @param {object} profileData - Profile data to update
   * @returns {Promise<object>} Updated user profile
   */
  updateUserProfile: async (profileData) => {
    try {
      const response = await api.put('/user/profile', profileData);
      
      // Update local storage with new profile data
      const currentUser = JSON.parse(localStorage.getItem('sevak_user') || '{}');
      const updatedUser = { ...currentUser, ...response };
      localStorage.setItem('sevak_user', JSON.stringify(updatedUser));
      
      return response;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  },
  
  /**
   * Update user preferences
   * @param {object} preferences - User preferences to update
   * @returns {Promise<object>} Updated preferences
   */
  updateUserPreferences: async (preferences) => {
    try {
      const response = await api.put('/user/preferences', preferences);
      
      // Update local storage with new preferences
      const currentUser = JSON.parse(localStorage.getItem('sevak_user') || '{}');
      const updatedUser = { 
        ...currentUser, 
        preferences: { ...currentUser.preferences, ...preferences } 
      };
      localStorage.setItem('sevak_user', JSON.stringify(updatedUser));
      
      return response;
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw error;
    }
  }
};