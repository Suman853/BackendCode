// routes/productRoutes.js
const express = require('express');
const router = express.Router();

// Import product controller
const productController = require('../controllers/productController');

// Define routes
router.get('/products',productController.getAllProducts);
router.post('/products/addToCart', productController.addToCart);
router.post('/products/buyNow', productController.buyNow);

module.exports = router;

