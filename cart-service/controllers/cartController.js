const Cart = require('../models/Cart');

// Add a product to the cart
exports.addProductToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists for the user, create a new one
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      // Check if the product already exists in the cart
      const existingProductIndex = cart.products.findIndex(
        (item) => item.productId === productId
      );

      if (existingProductIndex > -1) {
        // Update the quantity if product exists
        cart.products[existingProductIndex].quantity += quantity || 1;
      } else {
        // Add new product to the cart
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
};

// Get cart details by user ID
exports.getCartDetails = async (req, res) => {
  const { userId } = req.params;

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
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    // Filter out the product to be removed
    cart.products = cart.products.filter((item) => item.productId !== productId);

    await cart.save();
    res.status(200).json({ message: 'Product removed from cart successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart', error: error.message });
  }
};
