const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const { schemas } = require('../middleware/validator');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth.verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.success(user);
  } catch (error) {
    res.error(error.message, 500);
  }
});

// Update user profile
router.put('/profile', 
  auth.verifyToken,
  validate(schemas.updateUser),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        req.body,
        { new: true, runValidators: true }
      ).select('-password');
      
      res.success(user, 'Profile updated successfully');
    } catch (error) {
      res.error(error.message, 500);
    }
  }
);

// Change password
router.put('/password',
  auth.verifyToken,
  validate(schemas.changePassword),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      
      // Verify current password
      const isMatch = await user.comparePassword(req.body.currentPassword);
      if (!isMatch) {
        return res.error('Current password is incorrect', 401);
      }
      
      // Update password
      user.password = req.body.newPassword;
      await user.save();
      
      res.success(null, 'Password updated successfully');
    } catch (error) {
      res.error(error.message, 500);
    }
  }
);

// Delete user account
router.delete('/account',
  auth.verifyToken,
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.success(null, 'Account deleted successfully');
    } catch (error) {
      res.error(error.message, 500);
    }
  }
);

module.exports = router; 