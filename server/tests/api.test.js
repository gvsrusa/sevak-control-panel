const axios = require('axios');
const { expect } = require('chai');

const BASE_URL = 'http://localhost:3000/api';
let authToken = '';
let userId = '';
let deviceId = '';
let sensorId = '';

describe('Sevak Control Panel API Tests', () => {
  // Test Authentication Endpoints
  describe('Authentication', () => {
    it('should register a new user', async () => {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
      
      expect(response.status).to.equal(201);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.have.property('token');
      authToken = response.data.data.token;
    });

    it('should login with registered user', async () => {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: 'test@example.com',
        password: 'password123'
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.have.property('token');
      authToken = response.data.data.token;
      userId = response.data.data.user._id;
    });
  });

  // Test User Endpoints
  describe('User Management', () => {
    it('should get user profile', async () => {
      const response = await axios.get(`${BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.have.property('name', 'Test User');
    });

    it('should update user profile', async () => {
      const response = await axios.put(`${BASE_URL}/users/profile`, {
        name: 'Updated Test User'
      }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.have.property('name', 'Updated Test User');
    });
  });

  // Test Device Endpoints
  describe('Device Management', () => {
    it('should create a new device', async () => {
      const response = await axios.post(`${BASE_URL}/devices`, {
        name: 'Test Device',
        type: 'tractor',
        status: 'active'
      }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(201);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.have.property('name', 'Test Device');
      deviceId = response.data.data._id;
    });

    it('should get all devices', async () => {
      const response = await axios.get(`${BASE_URL}/devices`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.be.an('array');
    });

    it('should get device by ID', async () => {
      const response = await axios.get(`${BASE_URL}/devices/${deviceId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.have.property('_id', deviceId);
    });

    it('should update device', async () => {
      const response = await axios.put(`${BASE_URL}/devices/${deviceId}`, {
        name: 'Updated Test Device'
      }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.have.property('name', 'Updated Test Device');
    });
  });

  // Test Sensor Endpoints
  describe('Sensor Management', () => {
    it('should create a new sensor', async () => {
      const response = await axios.post(`${BASE_URL}/sensors`, {
        name: 'Test Sensor',
        type: 'temperature',
        deviceId: deviceId,
        threshold: 30
      }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(201);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.have.property('name', 'Test Sensor');
      sensorId = response.data.data._id;
    });

    it('should get all sensors for device', async () => {
      const response = await axios.get(`${BASE_URL}/sensors/device/${deviceId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.be.an('array');
    });

    it('should get sensor by ID', async () => {
      const response = await axios.get(`${BASE_URL}/sensors/${sensorId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.have.property('_id', sensorId);
    });

    it('should update sensor', async () => {
      const response = await axios.put(`${BASE_URL}/sensors/${sensorId}`, {
        name: 'Updated Test Sensor',
        threshold: 35
      }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.have.property('name', 'Updated Test Sensor');
    });

    it('should get sensor readings', async () => {
      const response = await axios.get(`${BASE_URL}/sensors/${sensorId}/readings`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
      expect(response.data.data).to.be.an('array');
    });
  });

  // Cleanup
  describe('Cleanup', () => {
    it('should delete sensor', async () => {
      const response = await axios.delete(`${BASE_URL}/sensors/${sensorId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
    });

    it('should delete device', async () => {
      const response = await axios.delete(`${BASE_URL}/devices/${deviceId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
    });

    it('should delete user account', async () => {
      const response = await axios.delete(`${BASE_URL}/users/account`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
    });
  });
}); 