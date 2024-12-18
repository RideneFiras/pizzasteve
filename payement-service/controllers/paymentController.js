const Payment = require('../models/Payment');

// Process Payment
const processPayment = async (req, res) => {
  try {
    const { userId, orderId, amount, paymentMethod } = req.body;
    const payment = new Payment({ userId, orderId, amount, paymentMethod });
    const savedPayment = await payment.save();

    res.status(201).json({ message: 'Payment processed successfully', payment: savedPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};

// Get Payment Status
const getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment status', error: error.message });
  }
};

module.exports = { processPayment, getPaymentStatus };
