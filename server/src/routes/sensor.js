const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const { schemas } = require('../middleware/validator');
const auth = require('../middleware/auth');

// Get all sensors for a device
router.get('/device/:deviceId', auth.verifyToken, async (req, res) => {
  try {
    const device = await Device.findOne({
      _id: req.params.deviceId,
      userId: req.user.id
    });
    
    if (!device) {
      return res.notFound('Device not found');
    }
    
    const sensors = await Sensor.find({ deviceId: req.params.deviceId });
    res.success(sensors);
  } catch (error) {
    res.error(error.message, 500);
  }
});

// Get sensor by ID
router.get('/:id', auth.verifyToken, async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id);
    
    if (!sensor) {
      return res.notFound('Sensor not found');
    }
    
    // Verify device ownership
    const device = await Device.findOne({
      _id: sensor.deviceId,
      userId: req.user.id
    });
    
    if (!device) {
      return res.unauthorized('Not authorized to access this sensor');
    }
    
    res.success(sensor);
  } catch (error) {
    res.error(error.message, 500);
  }
});

// Create new sensor
router.post('/',
  auth.verifyToken,
  validate(schemas.createSensor),
  async (req, res) => {
    try {
      // Verify device ownership
      const device = await Device.findOne({
        _id: req.body.deviceId,
        userId: req.user.id
      });
      
      if (!device) {
        return res.notFound('Device not found');
      }
      
      const sensor = new Sensor(req.body);
      await sensor.save();
      
      res.success(sensor, 'Sensor created successfully', 201);
    } catch (error) {
      res.error(error.message, 500);
    }
  }
);

// Update sensor
router.put('/:id',
  auth.verifyToken,
  validate(schemas.updateSensor),
  async (req, res) => {
    try {
      const sensor = await Sensor.findById(req.params.id);
      
      if (!sensor) {
        return res.notFound('Sensor not found');
      }
      
      // Verify device ownership
      const device = await Device.findOne({
        _id: sensor.deviceId,
        userId: req.user.id
      });
      
      if (!device) {
        return res.unauthorized('Not authorized to update this sensor');
      }
      
      const updatedSensor = await Sensor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      res.success(updatedSensor, 'Sensor updated successfully');
    } catch (error) {
      res.error(error.message, 500);
    }
  }
);

// Delete sensor
router.delete('/:id',
  auth.verifyToken,
  async (req, res) => {
    try {
      const sensor = await Sensor.findById(req.params.id);
      
      if (!sensor) {
        return res.notFound('Sensor not found');
      }
      
      // Verify device ownership
      const device = await Device.findOne({
        _id: sensor.deviceId,
        userId: req.user.id
      });
      
      if (!device) {
        return res.unauthorized('Not authorized to delete this sensor');
      }
      
      await Sensor.findByIdAndDelete(req.params.id);
      res.success(null, 'Sensor deleted successfully');
    } catch (error) {
      res.error(error.message, 500);
    }
  }
);

// Get sensor readings
router.get('/:id/readings', auth.verifyToken, async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id);
    
    if (!sensor) {
      return res.notFound('Sensor not found');
    }
    
    // Verify device ownership
    const device = await Device.findOne({
      _id: sensor.deviceId,
      userId: req.user.id
    });
    
    if (!device) {
      return res.unauthorized('Not authorized to access this sensor');
    }
    
    const readings = await SensorReading.find({ sensorId: req.params.id })
      .sort({ timestamp: -1 })
      .limit(100);
      
    res.success(readings);
  } catch (error) {
    res.error(error.message, 500);
  }
});

module.exports = router; 