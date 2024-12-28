const express = require('express');
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.get('/getProducts', getProducts);
router.post('/addProduct', addProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;
