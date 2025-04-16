const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensorReadingSchema = new Schema({
  sensorId: {
    type: Schema.Types.ObjectId,
    ref: 'Sensor',
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  metadata: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for sensor queries
sensorReadingSchema.index({ sensorId: 1, timestamp: -1 });

// Index for time-based queries
sensorReadingSchema.index({ timestamp: -1 });

// Compound index for sensor and time range queries
sensorReadingSchema.index({ sensorId: 1, timestamp: 1 });

const SensorReading = mongoose.model('SensorReading', sensorReadingSchema);

module.exports = SensorReading; 