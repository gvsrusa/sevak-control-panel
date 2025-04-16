const rateLimit = require('express-rate-limit');
const AppError = require('../utils/AppError');

// Rate limit for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later.',
  handler: (req, res) => {
    throw new AppError('Too many login attempts, please try again later.', 429);
  }
});

// Rate limit for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP, please try again later.',
  handler: (req, res) => {
    throw new AppError('Too many requests from this IP, please try again later.', 429);
  }
});

// Rate limit for sensitive operations
const sensitiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 attempts per hour
  message: 'Too many attempts for this operation, please try again later.',
  handler: (req, res) => {
    throw new AppError('Too many attempts for this operation, please try again later.', 429);
  }
});

module.exports = {
  authLimiter,
  apiLimiter,
  sensitiveLimiter
}; 