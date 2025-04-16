const Joi = require('joi');
const AppError = require('../utils/AppError');

// Validation schemas
const schemas = {
  // User schemas
  createUser: Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    role: Joi.string().valid('user', 'admin').default('user')
  }),

  updateUser: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    role: Joi.string().valid('user', 'admin')
  }).min(1),

  // Auth schemas
  login: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }),

  resetPassword: Joi.object({
    email: Joi.string().required().email()
  }),

  // Device schemas
  createDevice: Joi.object({
    name: Joi.string().required().min(2).max(50),
    type: Joi.string().required().valid('tractor', 'controller'),
    status: Joi.string().valid('active', 'inactive', 'maintenance').default('active'),
    location: Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required()
    })
  }),

  updateDevice: Joi.object({
    name: Joi.string().min(2).max(50),
    type: Joi.string().valid('tractor', 'controller'),
    status: Joi.string().valid('active', 'inactive', 'maintenance'),
    location: Joi.object({
      latitude: Joi.number(),
      longitude: Joi.number()
    })
  }).min(1),

  // Sensor schemas
  createSensor: Joi.object({
    deviceId: Joi.string().required(),
    type: Joi.string().required().valid('temperature', 'battery', 'location'),
    name: Joi.string().required().min(2).max(50),
    status: Joi.string().valid('active', 'inactive', 'maintenance').default('active'),
    threshold: Joi.number()
  }),

  updateSensor: Joi.object({
    type: Joi.string().valid('temperature', 'battery', 'location'),
    name: Joi.string().min(2).max(50),
    status: Joi.string().valid('active', 'inactive', 'maintenance'),
    threshold: Joi.number()
  }).min(1),

  createReading: Joi.object({
    sensorId: Joi.string().required(),
    value: Joi.number().required(),
    timestamp: Joi.date().default(Date.now)
  })
};

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.error(error.details[0].message, 400);
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
      throw new AppError(errorMessage, 400);
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
      throw new AppError(errorMessage, 400);
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