const express = require('express');
const router = express.Router();
const { processPayment, getPaymentStatus } = require('../controllers/paymentController');

router.post('/process', processPayment);         // Process a new payment
router.get('/:paymentId', getPaymentStatus);     // Get payment status by ID

module.exports = router;
