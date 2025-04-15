// src/utils/helpers.js
/**
 * Helper functions for the Sevak application
 */
import { TASK_STATUSES, OPERATION_MODES } from './constants';

/**
 * Format a date in user-friendly format
 * @param {Date|string|number} date - Date to format
 * @param {string} [format='medium'] - Format style ('short', 'medium', 'long')
 * @param {string} [locale] - Locale code
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium', locale) => {
  if (!date) return '';
  
  const dateObject = new Date(date);
  
  if (isNaN(dateObject.getTime())) {
    return 'Invalid date';
  }
  
  try {
    const options = {
      short: { month: 'numeric', day: 'numeric' },
      medium: { month: 'short', day: 'numeric', year: '2-digit' },
      long: { month: 'long', day: 'numeric', year: 'numeric' },
    };
    
    return dateObject.toLocaleDateString(locale, options[format] || options.medium);
  } catch (e) {
    console.error('Date formatting error:', e);
    return String(date);
  }
};

/**
 * Format time in user-friendly format
 * @param {Date|string|number} time - Time to format
 * @param {boolean} [includeSeconds=false] - Whether to include seconds
 * @param {string} [locale] - Locale code
 * @returns {string} Formatted time string
 */
export const formatTime = (time, includeSeconds = false, locale) => {
  if (!time) return '';
  
  const dateObject = new Date(time);
  
  if (isNaN(dateObject.getTime())) {
    return 'Invalid time';
  }
  
  try {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      ...(includeSeconds ? { second: '2-digit' } : {}),
    };
    
    return dateObject.toLocaleTimeString(locale, options);
  } catch (e) {
    console.error('Time formatting error:', e);
    return String(time);
  }
};

/**
 * Format a datetime in user-friendly format
 * @param {Date|string|number} datetime - Datetime to format
 * @param {boolean} [includeSeconds=false] - Whether to include seconds
 * @param {string} [locale] - Locale code
 * @returns {string} Formatted datetime string
 */
export const formatDateTime = (datetime, includeSeconds = false, locale) => {
  if (!datetime) return '';
  
  const dateObject = new Date(datetime);
  
  if (isNaN(dateObject.getTime())) {
    return 'Invalid datetime';
  }
  
  try {
    const options = {
      month: 'short',
      day: 'numeric',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      ...(includeSeconds ? { second: '2-digit' } : {}),
    };
    
    return dateObject.toLocaleString(locale, options);
  } catch (e) {
    console.error('Datetime formatting error:', e);
    return String(datetime);
  }
};

/**
 * Format battery percentage with descriptive text
 * @param {number} percentage - Battery percentage (0-100)
 * @param {string} [language='en'] - Language code
 * @returns {object} Formatted battery info with text and color
 */
export const formatBatteryStatus = (percentage, language = 'en') => {
  if (typeof percentage !== 'number' || isNaN(percentage)) {
    return { text: 'Unknown', color: 'gray' };
  }
  
  const descriptions = {
    en: {
      critical: 'Critical',
      low: 'Low',
      medium: 'Medium',
      good: 'Good',
      excellent: 'Excellent',
    },
    hi: {
      critical: 'अत्यंत कम',
      low: 'कम',
      medium: 'मध्यम',
      good: 'अच्छा',
      excellent: 'उत्कृष्ट',
    },
    mr: {
      critical: 'अत्यंत कमी',
      low: 'कमी',
      medium: 'मध्यम',
      good: 'चांगला',
      excellent: 'उत्कृष्ट',
    },
    te: {
      critical: 'క్రిటికల్',
      low: 'తక్కువ',
      medium: 'మధ్యస్థం',
      good: 'మంచిది',
      excellent: 'అద్భుతం',
    }
  };
  
  // Default to English if language not available
  const desc = descriptions[language] || descriptions.en;
  
  if (percentage <= 10) {
    return { text: desc.critical, color: 'red' };
  } else if (percentage <= 30) {
    return { text: desc.low, color: 'orange' };
  } else if (percentage <= 60) {
    return { text: desc.medium, color: 'yellow' };
  } else if (percentage <= 80) {
    return { text: desc.good, color: 'light-green' };
  } else {
    return { text: desc.excellent, color: 'green' };
  }
};

/**
 * Calculate estimated runtime based on battery percentage
 * @param {number} batteryPercentage - Battery percentage (0-100)
 * @param {number} [fullChargeRuntime=300] - Runtime in minutes on full charge
 * @returns {number} Estimated runtime in minutes
 */
export const calculateEstimatedRuntime = (batteryPercentage, fullChargeRuntime = 300) => {
  if (typeof batteryPercentage !== 'number' || isNaN(batteryPercentage)) {
    return 0;
  }
  
  return Math.max(0, Math.round((batteryPercentage / 100) * fullChargeRuntime));
};

/**
 * Format distance in user-friendly format
 * @param {number} meters - Distance in meters
 * @param {boolean} [useImperial=false] - Whether to use imperial units
 * @returns {string} Formatted distance
 */
export const formatDistance = (meters, useImperial = false) => {
  if (typeof meters !== 'number' || isNaN(meters)) {
    return 'Unknown';
  }
  
  if (useImperial) {
    const feet = meters * 3.28084;
    
    if (feet >= 5280) {
      const miles = feet / 5280;
      return `${miles.toFixed(1)} mi`;
    }
    
    return `${Math.round(feet)} ft`;
  } else {
    if (meters >= 1000) {
      const km = meters / 1000;
      return `${km.toFixed(1)} km`;
    }
    
    return `${Math.round(meters)} m`;
  }
};

/**
 * Format duration in user-friendly format
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration
 */
export const formatDuration = (minutes) => {
  if (typeof minutes !== 'number' || isNaN(minutes)) {
    return 'Unknown';
  }
  
  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};

/**
 * Get status color based on tractor status
 * @param {string} status - Tractor status
 * @returns {object} Color classes for the status
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'operational':
      return { bg: 'bg-green-500', text: 'text-green-700', border: 'border-green-500' };
    case 'standby':
      return { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-500' };
    case 'error':
      return { bg: 'bg-red-500', text: 'text-red-700', border: 'border-red-500' };
    case 'offline':
      return { bg: 'bg-gray-500', text: 'text-gray-700', border: 'border-gray-500' };
    default:
      return { bg: 'bg-gray-400', text: 'text-gray-600', border: 'border-gray-400' };
  }
};

/**
 * Get operation icon path based on operation type
 * @param {string} operation - Operation type
 * @returns {string} Path to the operation icon
 */
export const getOperationIcon = (operation) => {
  switch (operation) {
    case OPERATION_MODES.CUTTING:
      return 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z';
    case OPERATION_MODES.LOADING:
      return 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4';
    case OPERATION_MODES.TRANSPORT:
      return 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0';
    default:
      return 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z';
  }
};

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get task color based on task status
 * @param {string} status - Task status
 * @returns {object} Color classes for the task
 */
export const getTaskStatusColor = (status) => {
  switch (status) {
    case TASK_STATUSES.SCHEDULED:
      return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' };
    case TASK_STATUSES.IN_PROGRESS:
      return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' };
    case TASK_STATUSES.COMPLETED:
      return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    case TASK_STATUSES.CANCELLED:
      return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
  }
};

/**
 * Debounce a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle a function call
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};