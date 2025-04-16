#!/bin/bash

# Start MongoDB if not running
if ! pgrep -x "mongod" > /dev/null; then
    echo "Starting MongoDB..."
    mongod --dbpath ./data/db &
fi

# Start backend server
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Start hardware control
echo "Starting hardware control..."
cd hardware
source venv/bin/activate
python tractor_control.py &
HARDWARE_PID=$!
deactivate
cd ..

# Start mobile app development server
echo "Starting mobile app development server..."
cd mobile-app
npm start &
MOBILE_PID=$!
cd ..

# Store PIDs in a file for later use
echo $BACKEND_PID > .pids
echo $HARDWARE_PID >> .pids
echo $MOBILE_PID >> .pids

echo "All components started!"
echo "Backend PID: $BACKEND_PID"
echo "Hardware PID: $HARDWARE_PID"
echo "Mobile PID: $MOBILE_PID"

# Wait for any process to exit
wait

# Cleanup on exit
trap "kill $(cat .pids) 2>/dev/null; rm .pids" EXIT 