const Inventory = require('../models/Inventory');

// Get inventory for all products
const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json({ inventory });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
};

// Add or update a product in the inventory
const updateInventory = async (req, res) => {
  try {
    const { productId, productName, quantity } = req.body;

    const inventoryItem = await Inventory.findOneAndUpdate(
      { productId },
      { productId, productName, quantity, lastUpdated: Date.now() },
      { new: true, upsert: true } // Create new if it doesn't exist
    );

    res.status(200).json({
      message: 'Inventory updated successfully',
      inventory: inventoryItem,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error: error.message });
  }
};

// Check product availability
const checkProductAvailability = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Inventory.findOne({ productId });
    if (!product || product.quantity <= 0) {
      return res.status(404).json({ message: 'Product not available' });
    }

    res.status(200).json({ productId, productName: product.productName, quantity: product.quantity });
  } catch (error) {
    res.status(500).json({ message: 'Error checking product availability', error: error.message });
  }
};

module.exports = { getAllInventory, updateInventory, checkProductAvailability };
