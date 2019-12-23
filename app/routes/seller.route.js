const express = require('express');
const router = express.Router();

const sellerController = require('../controllers/seller.controller');
const uploadMulter = require('../configs/uploadConf');

// router.post('/add/', sellerController.add);
router.post(
	'/add/',
	uploadMulter.fields([
		{ name: 'main_img', maxCount: 1 },
		{ name: 'alt_imgs', maxCount: 4 }
	]),
	sellerController.add,
	(req, res) => {
		res.json(req.files);
	}
);
module.exports = router;
