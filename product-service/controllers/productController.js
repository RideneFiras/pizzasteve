const Product = require('../models/Products');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  // Validation: Check for missing fields
  if (!name || !price || !category) {
    return res.status(400).json({ message: 'Name, price, and category are required' });
  }

  try {
    // Create and save the product
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      createdBy: req.user.id, // Track which admin added the product
    });

    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, modifiedBy: req.user.id }, // Track admin modifying the product
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
