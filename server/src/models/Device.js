const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
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
    enum: ['tractor', 'controller']
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastConnected: {
    type: Date,
    default: null
  },
  batteryLevel: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
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

// Index for geospatial queries
deviceSchema.index({ location: '2dsphere' });

// Index for user queries
deviceSchema.index({ userId: 1 });

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device; 