const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/search', productController.search);

module.exports = router;
