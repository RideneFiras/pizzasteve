const express = require('express');
const router = express.Router();
const {
  getAllInventory,
  updateInventory,
  checkProductAvailability,
} = require('../controllers/inventoryController');

// Routes
router.get('/all', getAllInventory);                     // Get all inventory
router.post('/update', updateInventory);                 // Add or update a product
router.get('/check/:productId', checkProductAvailability); // Check product availability

module.exports = router;
