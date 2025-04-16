const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = {
  // Verify JWT token
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  },

  // Role-based access control
  checkRole: (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    };
  },

  // Check if user is the owner of the resource
  checkOwnership: (model, idField = 'userId') => {
    return async (req, res, next) => {
      try {
        const resource = await model.findById(req.params.id);
        
        if (!resource) {
          return res.status(404).json({ error: 'Resource not found' });
        }

        if (resource[idField].toString() !== req.user.id) {
          return res.status(403).json({ error: 'Not authorized to access this resource' });
        }

        next();
      } catch (error) {
        return res.status(500).json({ error: 'Server error' });
      }
    };
  },

  // Check if user is authenticated and has 2FA enabled
  check2FA: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!req.user.twoFactorEnabled) {
      return res.status(403).json({ error: 'Two-factor authentication required' });
    }

    next();
  },
};

module.exports = auth; 