const express = require('express');
const app = express();

const PORT = 4000;

// Array to store registered services
let services = [];

// Middleware to parse JSON requests
app.use(express.json());

// Route to register a microservice
app.post('/register', (req, res) => {
  const { name, address, port } = req.body;

  // Add the service to the list if not already registered
  services.push({ name, address, port });
  console.log(`Service registered: ${name} at ${address}:${port}`);

  res.json({ message: 'Service registered successfully' });
});

// Route to return the list of services
app.get('/services', (req, res) => {
  res.json(services);
});

// Start the Discovery Server
app.listen(PORT, () => {
  console.log(`Discovery Server running on port ${PORT}`);
});
