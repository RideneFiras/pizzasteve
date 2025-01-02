const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8080;

// Address of the Discovery Server
const discoveryServerUrl = 'http://localhost:4000/services';
// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000', // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to dynamically define the target service based on the route
app.use(async (req, res, next) => {
    try {
        // Fetch the list of available services from the Discovery Server
        const response = await axios.get(discoveryServerUrl);
        const services = response.data;

        // Extract the service name from the request path (e.g., "/product-service/api/...").
        const [_, serviceName, ...servicePath] = req.path.split('/');

        // Find the target service in the list
        const targetService = services.find(service => service.name === serviceName);

        if (targetService) {
            // Construct the target service URL
            req.targetServiceUrl = `${targetService.address}:${targetService.port}/${servicePath.join('/')}`;
            next();
        } else {
            // If the service is not found, return a 404 error
            res.status(404).send({ message: `Service "${serviceName}" introuvable` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Erreur de communication avec le serveur de découverte' });
    }
});

// Proxy requests to the target service
app.use(async (req, res) => {
    try {
        const response = await axios({
            method: req.method, // Preserve the HTTP method
            url: req.targetServiceUrl, // Route to the target service URL
            data: req.body, // Forward the request body
            headers: {
                ...req.headers, // Forward all headers
                'Content-Type': 'application/json', // Ensure content type is JSON
                'Content-Length': Buffer.byteLength(JSON.stringify(req.body)), // Correct content length
            },
            timeout: 15000, // 15 seconds timeout
        });

        res.status(response.status).send(response.data);
    } catch (error) {
        if (error.response) {
            // Return the error from the target service
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send({ message: 'Erreur lors de la communication avec le microservice' });
        }
    }
});

// Start the API Gateway
app.listen(port, () => {
    console.log(`Passerelle démarrée sur le port ${port}`);
});
