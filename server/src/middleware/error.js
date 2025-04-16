const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
      message: 'The authentication token is invalid'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired',
      message: 'The authentication token has expired'
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message,
      details: err.errors
    });
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    return res.status(409).json({
      error: 'Duplicate Entry',
      message: 'A record with this value already exists',
      field: Object.keys(err.keyPattern)[0]
    });
  }

  // Handle custom application errors
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      error: err.name,
      message: err.message
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
};

module.exports = errorHandler; 