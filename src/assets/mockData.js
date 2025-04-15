// src/assets/mockData.js
/**
 * Mock data for Sevak Mini Tractor Control Interface
 */
import { STATUS_TYPES, OPERATION_MODES, TASK_STATUSES, RECURRING_TYPES } from '../utils/constants';
import { formatDateTime } from '../utils/helpers';

// Current date for reference
const NOW = new Date();

// Tomorrow and day after
const TOMORROW = new Date(NOW);
TOMORROW.setDate(NOW.getDate() + 1);
const DAY_AFTER = new Date(NOW);
DAY_AFTER.setDate(NOW.getDate() + 2);

// Mock tractor status
export const mockTractorStatus = {
  id: 'sevak-001',
  name: 'Sevak Tractor 01',
  status: STATUS_TYPES.STANDBY,
  operationMode: null,
  batteryLevel: 78,
  isCharging: false,
  estimatedRuntime: 240, // minutes
  direction: null,
  speed: 0,
};

// Mock tractor location
export const mockTractorLocation = {
  latitude: 18.5204,
  longitude: 73.8567,
  heading: 90, // degrees
  timestamp: NOW.toISOString(),
};

// Mock field boundaries
export const mockFieldBoundaries = [
  {
    id: 'field-1',
    name: 'North Field',
    coordinates: [
      { latitude: 18.5214, longitude: 73.8557 },
      { latitude: 18.5214, longitude: 73.8587 },
      { latitude: 18.5184, longitude: 73.8587 },
      { latitude: 18.5184, longitude: 73.8557 },
    ],
  },
  {
    id: 'field-2',
    name: 'South Field',
    coordinates: [
      { latitude: 18.5174, longitude: 73.8557 },
      { latitude: 18.5174, longitude: 73.8587 },
      { latitude: 18.5144, longitude: 73.8587 },
      { latitude: 18.5144, longitude: 73.8557 },
    ],
  },
];

// Mock tasks
export const mockTasks = [
  {
    id: 't1',
    title: 'Morning Fodder Collection',
    description: 'Collect fresh fodder from the north field',
    type: OPERATION_MODES.CUTTING,
    status: TASK_STATUSES.SCHEDULED,
    scheduledTime: new Date(TOMORROW.setHours(6, 0, 0, 0)).toISOString(),
    duration: 60, // minutes
    recurring: RECURRING_TYPES.DAILY,
    location: {
      latitude: 18.5204,
      longitude: 73.8567,
      fieldId: 'field-1',
    },
    createdAt: new Date(NOW.setHours(NOW.getHours() - 24)).toISOString(),
    updatedAt: new Date(NOW.setHours(NOW.getHours() - 24)).toISOString(),
  },
  {
    id: 't2',
    title: 'Transport to Barn',
    description: 'Transport collected fodder to the barn for storage',
    type: OPERATION_MODES.TRANSPORT,
    status: TASK_STATUSES.SCHEDULED,
    scheduledTime: new Date(TOMORROW.setHours(7, 30, 0, 0)).toISOString(),
    duration: 45, // minutes
    recurring: RECURRING_TYPES.DAILY,
    location: {
      latitude: 18.5194,
      longitude: 73.8557,
      fieldId: 'field-1',
    },
    createdAt: new Date(NOW.setHours(NOW.getHours() - 24)).toISOString(),
    updatedAt: new Date(NOW.setHours(NOW.getHours() - 24)).toISOString(),
  },
  {
    id: 't3',
    title: 'Load Feed to Troughs',
    description: 'Load feed from storage to animal feeding area',
    type: OPERATION_MODES.LOADING,
    status: TASK_STATUSES.IN_PROGRESS,
    scheduledTime: new Date(NOW.setHours(NOW.getHours() - 1)).toISOString(),
    duration: 30, // minutes
    recurring: RECURRING_TYPES.DAILY,
    location: {
      latitude: 18.5174,
      longitude: 73.8557,
      fieldId: 'field-2',
    },
    createdAt: new Date(NOW.setHours(NOW.getHours() - 48)).toISOString(),
    updatedAt: new Date(NOW.setHours(NOW.getHours() - 1)).toISOString(),
  },
  {
    id: 't4',
    title: 'Weekly Field Rotation',
    description: 'Move to the south field for collection',
    type: OPERATION_MODES.CUTTING,
    status: TASK_STATUSES.SCHEDULED,
    scheduledTime: new Date(DAY_AFTER.setHours(6, 0, 0, 0)).toISOString(),
    duration: 90, // minutes
    recurring: RECURRING_TYPES.WEEKLY,
    location: {
      latitude: 18.5164,
      longitude: 73.8567,
      fieldId: 'field-2',
    },
    createdAt: new Date(NOW.setHours(NOW.getHours() - 72)).toISOString(),
    updatedAt: new Date(NOW.setHours(NOW.getHours() - 72)).toISOString(),
  },
  {
    id: 't5',
    title: 'Yesterday\'s Collection',
    description: 'Regular morning collection',
    type: OPERATION_MODES.CUTTING,
    status: TASK_STATUSES.COMPLETED,
    scheduledTime: new Date(NOW.setHours(-18, 0, 0, 0)).toISOString(), // yesterday
    completedTime: new Date(NOW.setHours(-17, 0, 0, 0)).toISOString(), // yesterday
    duration: 60, // minutes
    recurring: RECURRING_TYPES.DAILY,
    location: {
      latitude: 18.5204,
      longitude: 73.8567,
      fieldId: 'field-1',
    },
    createdAt: new Date(NOW.setHours(NOW.getHours() - 96)).toISOString(),
    updatedAt: new Date(NOW.setHours(NOW.getHours() - 17)).toISOString(),
  },
];

// Mock diagnostics data
export const mockDiagnostics = {
  id: 'sevak-001',
  timestamp: NOW.toISOString(),
  batteryHealth: 92, // percentage
  motorStatus: 'optimal',
  cutterCondition: 'good',
  loaderCondition: 'good',
  hydraulicPressure: 'normal',
  lastMaintenance: new Date(NOW.setMonth(NOW.getMonth() - 1)).toISOString(),
  nextMaintenance: new Date(NOW.setMonth(NOW.getMonth() + 2)).toISOString(),
  totalOperatingHours: 427,
  alerts: [],
  warnings: [],
};

// Mock user data
export const mockUser = {
  id: 'user-1',
  name: 'Rajesh Patel',
  phoneNumber: '+91 9876543210',
  role: 'owner',
  preferences: {
    language: 'hi',
    notifications: true,
    mapZoomLevel: 16,
    batteryAlertThreshold: 20,
  },
  farms: [
    {
      id: 'farm-1',
      name: 'Patel Farm',
      location: {
        latitude: 18.5204,
        longitude: 73.8567,
        address: 'Pune District, Maharashtra',
      },
      size: 5.2, // hectares
      crops: ['wheat', 'rice', 'pulses'],
      tractors: ['sevak-001'],
    },
  ],
};

// Mock analytics data
export const mockAnalytics = {
  usage: {
    totalHours: 427,
    byOperation: {
      [OPERATION_MODES.CUTTING]: 215,
      [OPERATION_MODES.LOADING]: 112,
      [OPERATION_MODES.TRANSPORT]: 100,
    },
    byMonth: [
      { month: 'Jan', hours: 42 },
      { month: 'Feb', hours: 38 },
      { month: 'Mar', hours: 45 },
      { month: 'Apr', hours: 52 },
      { month: 'May', hours: 48 },
      { month: 'Jun', hours: 55 },
      { month: 'Jul', hours: 50 },
      { month: 'Aug', hours: 45 },
      { month: 'Sep', hours: 43 },
      { month: 'Oct', hours: 9 },
      { month: 'Nov', hours: 0 },
      { month: 'Dec', hours: 0 },
    ],
  },
  battery: {
    averageConsumption: 15, // percentage per hour
    chargeCycles: 78,
    healthPercentage: 92,
    averageRuntimePerCharge: 5.2, // hours
  },
  efficiency: {
    areaProcessedDaily: 0.8, // hectares
    fuelSaved: 320, // liters
    co2Reduced: 768, // kg
    costSavings: 25600, // rupees
  },
};

// Function to get all mock data
export const getAllMockData = () => ({
  tractorStatus: mockTractorStatus,
  tractorLocation: mockTractorLocation,
  fieldBoundaries: mockFieldBoundaries,
  tasks: mockTasks,
  diagnostics: mockDiagnostics,
  user: mockUser,
  analytics: mockAnalytics,
});