const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Telemetry Schema
const telemetrySchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    battery: Number,
    speed: Number,
    motorTemperature: Number,
    cuttingStatus: String,
    trailerStatus: String,
    location: {
        lat: Number,
        lng: Number
    }
});

const Telemetry = mongoose.model('Telemetry', telemetrySchema);

module.exports = {
    connectDB,
    Telemetry
}; 