// src/utils/constants.js
/**
 * Application-wide constants
 */

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    OTP_GENERATE: '/api/auth/otp/generate',
    OTP_VERIFY: '/api/auth/otp/verify',
    REFRESH: '/api/auth/refresh',
    STATUS: '/api/auth/status'
  },
  USER: {
    PROFILE: '/api/user/profile',
    PREFERENCES: '/api/user/preferences',
  },
  TRACTOR: {
    STATUS: (id) => `/api/tractor/${id}/status`,
    CONTROL: (id) => `/api/tractor/${id}/control`,
    EMERGENCY_STOP: (id) => `/api/tractor/${id}/emergency-stop`,
    LOCATION: (id) => `/api/tractor/${id}/location`,
    DIAGNOSTICS: (id) => `/api/tractor/${id}/diagnostics`,
  },
  TASKS: {
    LIST: '/api/tasks',
    DETAIL: (id) => `/api/tasks/${id}`,
    EXECUTE: (id) => `/api/tasks/${id}/execute`,
  },
  MAP: {
    BOUNDARIES: '/api/boundaries',
    BOUNDARY_DETAIL: (id) => `/api/boundaries/${id}`,
    TILES: (z, x, y) => `/api/maps/tiles/${z}/${x}/${y}`,
  },
  ANALYTICS: {
    USAGE: '/api/analytics/usage',
    EFFICIENCY: '/api/analytics/efficiency',
    BATTERY: '/api/analytics/battery',
  },
};

// Status types
export const STATUS_TYPES = {
  OPERATIONAL: 'operational',
  STANDBY: 'standby',
  ERROR: 'error',
  OFFLINE: 'offline',
};

// Operation modes
export const OPERATION_MODES = {
  CUTTING: 'cutting',
  LOADING: 'loading',
  TRANSPORT: 'transport',
};

// Task statuses
export const TASK_STATUSES = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'inProgress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Recurring types
export const RECURRING_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  CUSTOM: 'custom',
};

// Direction commands
export const DIRECTION_COMMANDS = {
  FORWARD: 'forward',
  REVERSE: 'reverse',
  LEFT: 'left',
  RIGHT: 'right',
  STOP: 'stop',
};

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' }, // Hindi
  { code: 'mr', name: 'मराठी' }, // Marathi
  { code: 'te', name: 'తెలుగు' }, // Telugu
];

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'sevak_token',
  USER: 'sevak_user',
  LANGUAGE: 'sevak_language',
  CACHED_TASKS: 'sevak_cached_tasks',
  CACHED_STATUS: 'sevak_cached_status',
};

// IndexedDB constants
export const INDEXED_DB = {
  DATABASE_NAME: 'sevak_offline_db',
  VERSION: 1,
  STORES: {
    CACHED_DATA: 'cached_data',
    PENDING_OPERATIONS: 'pending_operations',
  },
};

// Default settings
export const DEFAULT_SETTINGS = {
  language: 'hi',
  notifications: true,
  mapZoomLevel: 16,
  batteryAlertThreshold: 20,
  syncInterval: 60000, // milliseconds
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_ERROR: 'Authentication error. Please log in again.',
  PERMISSION_ERROR: 'You do not have permission to perform this action.',
  GENERAL_ERROR: 'Something went wrong. Please try again.',
  OFFLINE_MODE: 'This action is limited in offline mode.',
};