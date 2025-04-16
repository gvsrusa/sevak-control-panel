# Testing Guide for Sevak Mini Tractor

## Hardware Testing

### 1. Motor Testing
```bash
# Test individual motors
python hardware/test_motors.py --motor left
python hardware/test_motors.py --motor right
python hardware/test_motors.py --motor cutting
python hardware/test_motors.py --motor loading

# Test all motors together
python hardware/test_motors.py --all
```

### 2. Sensor Testing
```bash
# Test temperature sensor
python hardware/test_sensors.py --sensor temperature

# Test battery sensor
python hardware/test_sensors.py --sensor battery

# Test all sensors
python hardware/test_sensors.py --all
```

### 3. Safety System Testing
```bash
# Test emergency stop
python hardware/test_safety.py --test emergency_stop

# Test temperature limits
python hardware/test_safety.py --test temperature

# Test battery limits
python hardware/test_safety.py --test battery

# Test speed limits
python hardware/test_safety.py --test speed
```

## Software Testing

### 1. Backend Testing
```bash
# Install test dependencies
cd backend
npm install --save-dev jest supertest

# Run tests
npm test

# Run specific test file
npm test -- tests/api.test.js
```

### 2. Mobile App Testing
```bash
# Install test dependencies
cd mobile-app
npm install --save-dev jest @testing-library/react-native

# Run tests
npm test

# Run specific test file
npm test -- tests/components/ControlScreen.test.js
```

## Integration Testing

### 1. Full System Test
```bash
# Start all components
./scripts/start_all.sh

# Run integration tests
./scripts/test_integration.sh
```

### 2. Network Testing
```bash
# Test network latency
./scripts/test_network.sh

# Test connection stability
./scripts/test_connection.sh
```

## Testing Scenarios

### 1. Normal Operation
- Start tractor
- Move forward/backward
- Turn left/right
- Start/stop cutting
- Load/unload trailer
- Monitor telemetry

### 2. Error Conditions
- Low battery
- High temperature
- Network disconnection
- Emergency stop
- Motor failure
- Sensor failure

### 3. Safety Features
- Emergency stop button
- Temperature limits
- Battery limits
- Speed limits
- Obstacle detection

## Test Results

Record test results in the following format:
```json
{
  "test_name": "string",
  "timestamp": "ISO date",
  "result": "pass/fail",
  "details": {
    "component": "string",
    "expected": "string",
    "actual": "string",
    "notes": "string"
  }
}
```

## Reporting Issues

1. Create a new issue in the GitHub repository
2. Include:
   - Test scenario
   - Expected behavior
   - Actual behavior
   - Steps to reproduce
   - Environment details
   - Logs and error messages
3. Label the issue appropriately
4. Assign to relevant team member 