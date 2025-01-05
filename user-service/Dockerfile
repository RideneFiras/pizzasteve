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
# NOTE: Replace `mongodb://user-service-db:27017` with your MongoDB URI if using Docker Compose
ENV JWT_SECRET=your-secret-key
ENV MONGO_URI=mongodb://root:example@user-service-db:27017/petepizza-users?authSource=admin

# Start the application
CMD ["node", "app.js"]
