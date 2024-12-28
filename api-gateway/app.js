const express = require('express');
const axios = require('axios');
const app = express();
const port = 6000;

// Address of the Discovery Server
const discoveryServerUrl = 'http://localhost:4000/services';

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to dynamically define the target service based on the route
app.use(async (req, res, next) => {
    try {
        // Fetch the list of available services from the Discovery Server
        const response = await axios.get(discoveryServerUrl);
        const services = response.data;

        // Check which service is targeted
        if (req.path.startsWith('/service1')) {
            req.targetService = services.find(service => service.name === 'service1');
            console.log(req.targetService)
        } else if (req.path.startsWith('/service2')) {
            req.targetService = services.find(service => service.name === 'service2');
        }

        // If target service is found, set its URL
        if (req.targetService) {
            req.targetServiceUrl = `${req.targetService.address}:${req.targetService.port}`;
            console.log( req.targetServiceUrl)
            next();
        } else {
            res.status(404).send({ message: 'Microservice introuvable' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Erreur de communication avec le serveur de découverte' });
    }
});

// Proxy requests to the target service
app.use(async (req, res) => {
    try {
        console.log(`${req.targetServiceUrl}${req.originalUrl.replace(/^\/service[1-2]/, '')}`)
        const response = await axios({
            method: req.method, // Preserve the HTTP method
            url: `${req.targetServiceUrl}${req.originalUrl.replace(/^\/service[1-2]/, '')}`,
            data: req.body, // Forward the request body
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la communication avec le microservice' });
    }
});

// Start the API Gateway
app.listen(port, () => {
    console.log(`Passerelle démarrée sur le port ${port}`);
});
