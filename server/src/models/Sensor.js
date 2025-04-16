const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  type: {
    type: String,
    required: true,
    enum: ['temperature', 'battery', 'location']
  },
  deviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  threshold: {
    type: Number,
    min: 0,
    default: null
  },
  unit: {
    type: String,
    required: true,
    enum: ['°C', '%', 'm', 'km/h'],
    default: function() {
      switch (this.type) {
        case 'temperature':
          return '°C';
        case 'battery':
          return '%';
        case 'location':
          return 'm';
        default:
          return null;
      }
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'error'],
    default: 'active'
  },
  lastReading: {
    value: {
      type: Number,
      default: null
    },
    timestamp: {
      type: Date,
      default: null
    }
  },
  settings: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for device queries
sensorSchema.index({ deviceId: 1 });

// Index for type queries
sensorSchema.index({ type: 1 });

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor; 