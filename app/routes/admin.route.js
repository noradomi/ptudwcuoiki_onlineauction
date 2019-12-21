const express = require('express');
const router = express.Router();

const admincontroller = require('../controllers/admin.controller');
router.get('/', admincontroller.dasboard);
module.exports = router;