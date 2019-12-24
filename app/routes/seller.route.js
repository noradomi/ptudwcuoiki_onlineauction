const express = require('express');
const router = express.Router();

const sellerController = require('../controllers/seller.controller');
const uploadMulter = require('../configs/uploadConf');

router.get('/post', sellerController.postproduct);

router.get('/myproduct', sellerController.myproduct);

router.get('/mydoneproduct', sellerController.mydoneproduct);

router.post('/:id/description/edit', sellerController.edit_desc);

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

router.post('/denybid/:bidderId/:proId', sellerController.deny_bid);

module.exports = router;
