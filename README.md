# Sevak Mini Tractor Control Panel

Sevak is an autonomous electric mini tractor designed for rural areas in India, specifically for cutting fodder, loading it into an attached trailer, and transporting it to livestock areas.

## Features

- Autonomous operation
- Remote control via mobile app
- Electric powertrain
- Fodder cutting and collection system
- Trailer attachment for transport
- Real-time telemetry and monitoring

## Project Structure

```
sevak-control-panel/
├── backend/           # Backend server for tractor control
├── mobile-app/        # Mobile application for remote control
├── hardware/          # Hardware control code and specifications
└── docs/             # Documentation and specifications
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Python 3.9+
- Android Studio (for mobile app development)
- ROS2 (for hardware control)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install mobile app dependencies:
   ```bash
   cd mobile-app
   npm install
   ```
4. Install hardware control dependencies:
   ```bash
   cd hardware
   pip install -r requirements.txt
   ```

## Development

- Backend: `cd backend && npm run dev`
- Mobile App: `cd mobile-app && npm run android`
- Hardware Control: `cd hardware && python main.py`

## License

MIT License 