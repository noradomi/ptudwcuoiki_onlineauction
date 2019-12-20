const express = require('express');
const router = express.Router();

const sellercontroller = require('../controllers/seller.controller');
router.post('/add/', sellercontroller.add);
module.exports = router;