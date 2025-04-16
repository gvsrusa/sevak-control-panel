const responseFormatter = (req, res, next) => {
  // Success response formatter
  res.success = (data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  };

  // Paginated response formatter
  res.paginated = (data, pagination, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      pagination: {
        total: pagination.total,
        page: pagination.page,
        limit: pagination.limit,
        pages: Math.ceil(pagination.total / pagination.limit)
      }
    });
  };

  // Error response formatter
  res.error = (message, statusCode = 400, errors = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  };

  // Not found response formatter
  res.notFound = (message = 'Resource not found') => {
    return res.status(404).json({
      success: false,
      message
    });
  };

  // Unauthorized response formatter
  res.unauthorized = (message = 'Unauthorized access') => {
    return res.status(401).json({
      success: false,
      message
    });
  };

  // Forbidden response formatter
  res.forbidden = (message = 'Forbidden access') => {
    return res.status(403).json({
      success: false,
      message
    });
  };

  next();
};

module.exports = responseFormatter; 