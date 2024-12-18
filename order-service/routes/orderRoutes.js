const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
} = require('../controllers/orderController');

router.post('/place', placeOrder);                // Place an order
router.get('/:userId', getUserOrders);            // Get all orders for a user
router.put('/updateStatus', updateOrderStatus);   // Update order status

module.exports = router;
