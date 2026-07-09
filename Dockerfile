# Use a small Node base image
FROM node:26-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only backend package files first to leverage Docker layer caching
COPY server/package*.json ./

# Install backend dependencies
RUN npm install --production

# Copy backend source code
COPY server/ ./

# Expose the backend port
EXPOSE 5000

# Run the backend server
CMD ["node", "server.js"]
