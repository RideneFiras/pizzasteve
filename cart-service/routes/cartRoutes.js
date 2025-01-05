const express = require('express');
const router = express.Router();
const { authMiddleware } = require('auth-middleware'); // Use your existing middleware package
const {
  addProductToCart,
  getCartDetails,
  removeProductFromCart,
} = require('../controllers/cartController');

// Add product to cart
router.post('/add', authMiddleware, addProductToCart);

// Get cart details
router.get('/', authMiddleware, getCartDetails);

// Remove product from cart
router.delete('/remove', authMiddleware, removeProductFromCart);

module.exports = router;
