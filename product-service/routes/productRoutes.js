const express = require('express');
const { authMiddleware, isAdmin } = require('auth-middleware');

const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.get('/getProducts', authMiddleware, getProducts);
router.post('/addProduct',authMiddleware, isAdmin, addProduct);
router.put('/updateProduct/:id', authMiddleware, isAdmin,updateProduct);
router.delete('/deleteProduct/:id', authMiddleware, isAdmin,deleteProduct);

module.exports = router;
