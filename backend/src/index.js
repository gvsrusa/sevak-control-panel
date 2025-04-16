const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, Telemetry } = require('./database');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Get historical telemetry data
app.get('/api/telemetry', async (req, res) => {
  try {
    const { limit = 100 } = req.query;
    const telemetry = await Telemetry.find()
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));
    res.json(telemetry);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching telemetry data' });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle tractor control commands
  socket.on('control', async (data) => {
    try {
      // Validate control command
      if (!data.type || !['movement', 'action'].includes(data.type)) {
        throw new Error('Invalid control command type');
      }

      // Broadcast control commands to all connected clients
      io.emit('tractor-control', data);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Handle telemetry data from tractor
  socket.on('telemetry', async (data) => {
    try {
      // Validate telemetry data
      if (!data.battery || !data.speed || !data.motorTemperature) {
        throw new Error('Invalid telemetry data');
      }

      // Store telemetry data in database
      const telemetry = new Telemetry(data);
      await telemetry.save();

      // Broadcast telemetry data to all connected clients
      io.emit('tractor-telemetry', data);
    } catch (error) {
      console.error('Error processing telemetry:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 