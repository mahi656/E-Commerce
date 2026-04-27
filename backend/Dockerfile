# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production
RUN npm install -g pm2

# Copy the rest of the application code
COPY . .

# Expose port (Updated to match .env)
EXPOSE 5001

# Start the application
CMD ["pm2-runtime", "server.js"]
