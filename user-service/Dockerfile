# Use Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the app
CMD ["node", "app.js"]
