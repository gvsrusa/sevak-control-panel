const Joi = require('joi');
const AppError = require('../utils/AppError');

// Validation schemas
const schemas = {
  // User schemas
  createUser: Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')),
    role: Joi.string().valid('user', 'admin').default('user'),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).optional(),
    address: Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zipCode: Joi.string().pattern(new RegExp('^[0-9]{5}$'))
    }).optional()
  }),

  updateUser: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')),
    role: Joi.string().valid('user', 'admin'),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')),
    address: Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zipCode: Joi.string().pattern(new RegExp('^[0-9]{5}$'))
    })
  }).min(1),

  // Auth schemas
  login: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }),

  resetPassword: Joi.object({
    email: Joi.string().required().email(),
    token: Joi.string().required(),
    newPassword: Joi.string().required().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
  }),

  // Device schemas
  createDevice: Joi.object({
    name: Joi.string().required().min(2).max(50),
    type: Joi.string().required().valid('tractor', 'controller'),
    status: Joi.string().valid('active', 'inactive', 'maintenance').default('active'),
    location: Joi.object({
      latitude: Joi.number().required().min(-90).max(90),
      longitude: Joi.number().required().min(-180).max(180)
    }),
    metadata: Joi.object({
      model: Joi.string(),
      manufacturer: Joi.string(),
      serialNumber: Joi.string(),
      firmwareVersion: Joi.string()
    }).optional()
  }),

  updateDevice: Joi.object({
    name: Joi.string().min(2).max(50),
    type: Joi.string().valid('tractor', 'controller'),
    status: Joi.string().valid('active', 'inactive', 'maintenance'),
    location: Joi.object({
      latitude: Joi.number().min(-90).max(90),
      longitude: Joi.number().min(-180).max(180)
    }),
    metadata: Joi.object({
      model: Joi.string(),
      manufacturer: Joi.string(),
      serialNumber: Joi.string(),
      firmwareVersion: Joi.string()
    })
  }).min(1),

  // Sensor schemas
  createSensor: Joi.object({
    deviceId: Joi.string().required(),
    type: Joi.string().required().valid('temperature', 'battery', 'location', 'humidity', 'pressure'),
    name: Joi.string().required().min(2).max(50),
    status: Joi.string().valid('active', 'inactive', 'maintenance').default('active'),
    threshold: Joi.object({
      min: Joi.number(),
      max: Joi.number()
    }).optional(),
    calibration: Joi.object({
      offset: Joi.number(),
      multiplier: Joi.number()
    }).optional(),
    metadata: Joi.object({
      unit: Joi.string(),
      precision: Joi.number(),
      samplingRate: Joi.number()
    }).optional()
  }),

  updateSensor: Joi.object({
    type: Joi.string().valid('temperature', 'battery', 'location', 'humidity', 'pressure'),
    name: Joi.string().min(2).max(50),
    status: Joi.string().valid('active', 'inactive', 'maintenance'),
    threshold: Joi.object({
      min: Joi.number(),
      max: Joi.number()
    }),
    calibration: Joi.object({
      offset: Joi.number(),
      multiplier: Joi.number()
    }),
    metadata: Joi.object({
      unit: Joi.string(),
      precision: Joi.number(),
      samplingRate: Joi.number()
    })
  }).min(1),

  // Reading schemas
  createReading: Joi.object({
    sensorId: Joi.string().required(),
    value: Joi.number().required(),
    timestamp: Joi.date().default(Date.now),
    metadata: Joi.object({
      quality: Joi.number().min(0).max(100),
      confidence: Joi.number().min(0).max(1),
      source: Joi.string()
    }).optional()
  }),

  // Alert schemas
  createAlert: Joi.object({
    deviceId: Joi.string().required(),
    sensorId: Joi.string().required(),
    type: Joi.string().required().valid('threshold', 'anomaly', 'status'),
    severity: Joi.string().required().valid('low', 'medium', 'high', 'critical'),
    message: Joi.string().required(),
    metadata: Joi.object({
      threshold: Joi.number(),
      expectedValue: Joi.number(),
      actualValue: Joi.number()
    }).optional()
  }),

  // Notification schemas
  createNotification: Joi.object({
    userId: Joi.string().required(),
    type: Joi.string().required().valid('alert', 'system', 'maintenance'),
    title: Joi.string().required(),
    message: Joi.string().required(),
    priority: Joi.string().valid('low', 'medium', 'high'),
    metadata: Joi.object({
      alertId: Joi.string(),
      deviceId: Joi.string(),
      actionRequired: Joi.boolean()
    }).optional()
  })
};

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      return res.error(errorMessage, 400);
    }
    next();
  };
};

// Query parameter validation middleware
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      return res.error(errorMessage, 400);
    }
    next();
  };
};

// URL parameter validation middleware
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      return res.error(errorMessage, 400);
    }
    next();
  };
};

module.exports = {
  schemas,
  validate,
  validateQuery,
  validateParams
}; 