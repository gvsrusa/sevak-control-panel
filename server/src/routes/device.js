const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const { schemas } = require('../middleware/validator');
const auth = require('../middleware/auth');

// Get all devices
router.get('/', auth.verifyToken, async (req, res) => {
  try {
    const devices = await Device.find({ userId: req.user.id });
    res.success(devices);
  } catch (error) {
    res.error(error.message, 500);
  }
});

// Get device by ID
router.get('/:id', auth.verifyToken, async (req, res) => {
  try {
    const device = await Device.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!device) {
      return res.notFound('Device not found');
    }
    
    res.success(device);
  } catch (error) {
    res.error(error.message, 500);
  }
});

// Create new device
router.post('/',
  auth.verifyToken,
  validate(schemas.createDevice),
  async (req, res) => {
    try {
      const device = new Device({
        ...req.body,
        userId: req.user.id
      });
      
      await device.save();
      res.success(device, 'Device created successfully', 201);
    } catch (error) {
      res.error(error.message, 500);
    }
  }
);

// Update device
router.put('/:id',
  auth.verifyToken,
  validate(schemas.updateDevice),
  async (req, res) => {
    try {
      const device = await Device.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!device) {
        return res.notFound('Device not found');
      }
      
      res.success(device, 'Device updated successfully');
    } catch (error) {
      res.error(error.message, 500);
    }
  }
);

// Delete device
router.delete('/:id',
  auth.verifyToken,
  async (req, res) => {
    try {
      const device = await Device.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id
      });
      
      if (!device) {
        return res.notFound('Device not found');
      }
      
      res.success(null, 'Device deleted successfully');
    } catch (error) {
      res.error(error.message, 500);
    }
  }
);

// Get device status
router.get('/:id/status', auth.verifyToken, async (req, res) => {
  try {
    const device = await Device.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!device) {
      return res.notFound('Device not found');
    }
    
    res.success({
      status: device.status,
      lastUpdated: device.updatedAt
    });
  } catch (error) {
    res.error(error.message, 500);
  }
});

module.exports = router; 