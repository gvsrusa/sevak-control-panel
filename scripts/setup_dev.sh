#!/bin/bash

# Create necessary directories
mkdir -p logs
mkdir -p data

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install mobile app dependencies
echo "Installing mobile app dependencies..."
cd mobile-app
npm install
cd ..

# Install hardware dependencies
echo "Installing hardware dependencies..."
cd hardware
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate
cd ..

# Create environment files
echo "Creating environment files..."
cp backend/.env.example backend/.env
cp mobile-app/.env.example mobile-app/.env
cp hardware/.env.example hardware/.env

# Set up MongoDB
echo "Setting up MongoDB..."
if ! command -v mongod &> /dev/null; then
    echo "MongoDB is not installed. Please install MongoDB first."
    exit 1
fi

# Create log directory
mkdir -p /var/log/sevak

echo "Development environment setup complete!" 