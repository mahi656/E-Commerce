#!/bin/bash

# Next Store Deployment Script
echo "Initializing Deployment Process..."

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "Error: Docker is not installed. Please install Docker and try again."
    exit 1
fi

# 1. Pull latest code (if in git)
# echo "Pulling latest changes..."
# git pull origin main

# 2. Stop and remove existing containers
echo "Cleaning up old containers..."
docker-compose down --remove-orphans

# 3. Build and Start Services
echo "Building and starting services..."
docker-compose up --build -d

# 4. Final status check
echo "Current Container Status:"
docker-compose ps

echo "Deployment Successful!"
echo "Frontend: http://localhost:5173"
echo "Backend API: http://localhost:5001"
