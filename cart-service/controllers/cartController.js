const Cart = require('../models/Cart');
const axios = require('axios'); // For calling the Product Service

// Add a product to the cart
exports.addProductToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Extracted from token

  try {
    // Fetch product details from the Product Service
    const productResponse = await axios.get(`http://localhost:8080/product-service/api/products/${productId}`);
    const { name: productName, price } = productResponse.data;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, productName, price, quantity }],
      });
    } else {
      const existingProductIndex = cart.products.findIndex((item) => item.productId === productId);

      if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += quantity || 1;
      } else {
        cart.products.push({ productId, productName, price, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
};

// Get cart details
exports.getCartDetails = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart details', error: error.message });
  }
};

// Remove a product from the cart
exports.removeProductFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    cart.products = cart.products.filter((item) => item.productId !== productId);

    await cart.save();
    res.status(200).json({ message: 'Product removed from cart successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart', error: error.message });
  }
};
