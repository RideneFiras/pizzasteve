const express = require('express');
const router = express.Router();
const {
  addProductToCart,
  getCartDetails,
  removeProductFromCart,
} = require('../controllers/cartController');

// Add product to cart
router.post('/add', addProductToCart);

// Get cart details by userId
router.get('/:userId', getCartDetails);

// Remove product from cart
router.delete('/remove', removeProductFromCart);

module.exports = router;
