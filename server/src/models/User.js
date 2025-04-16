const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  githubId: {
    type: String,
    sparse: true,
    unique: true,
  },
  linkedinId: {
    type: String,
    sparse: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
    enum: ['google', 'github', 'linkedin'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  settings: {
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
    language: {
      type: String,
      default: 'en',
    },
  },
});

// Update lastLogin timestamp before saving
userSchema.pre('save', function(next) {
  this.lastLogin = new Date();
  next();
});

// Add indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ githubId: 1 });
userSchema.index({ linkedinId: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User; 