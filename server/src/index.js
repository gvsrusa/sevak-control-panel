const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { apiLimiter, authLimiter, sensitiveLimiter } = require('./middleware/rateLimiter');
const { requestLogger, errorLogger } = require('./middleware/logger');
const responseFormatter = require('./middleware/responseFormatter');
const config = require('./config');

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? ['http://localhost:19006', 'http://localhost:3000']
    : ['https://your-production-domain.com'],
  credentials: true,
}));

// Logging middleware
app.use(requestLogger);

// Response formatting middleware
app.use(responseFormatter);

// Rate limiting
app.use('/api/auth', authLimiter);
app.use('/api/sensitive', sensitiveLimiter);
app.use('/api/', apiLimiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(config.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const deviceRoutes = require('./routes/device');
const sensorRoutes = require('./routes/sensor');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/sensors', sensorRoutes);

// Error logging middleware
app.use(errorLogger);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.isOperational) {
    return res.error(err.message, err.statusCode);
  }
  
  console.error('ERROR 💥', err);
  return res.error('Something went wrong!', 500);
});

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.server.env} mode on port ${PORT}`);
}); 