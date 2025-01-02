# Use Node.js image to build and run the application
FROM node:16

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port the service runs on
EXPOSE 5000

# Set environment variables directly (since no .env file is used)
ENV JWT_SECRET=your-secret-key
ENV MONGO_URI=mongodb://localhost:27017/petepizza-users

# Start the application
CMD ["npm", "start"]
