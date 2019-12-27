const models = require('../models');
const auth = require('../middleware/auth.middleware');

module.exports.postproduct = async (req, res) => {
	//  Kiểm tra phải là seller không ?
	if (auth.isSeller(req, res)) {
		let ProT = await models.product_type.findAllProT();

		req.user.isloggedin = true;
		res.render('web/sellerproduct', {
			user: [req.user],
			isBidder: req.user.role === 0,
			isSeller: req.user.role === 1,
			ProT: ProT
		});
	} else {
		res.redirect('/');
	}
};

module.exports.myproduct = async function(req, res) {
	//  Kiểm tra phải là seller không ?
	if (auth.isSeller(req, res)) {
		// let ProT = await models.product_type.findAllProT();
		let myPros = [];
		myPros = await models.product.findAllNotExpiredProducts(1);

		if (req.session.updateSuccess == null) {
			req.session.updateSuccess = false;
		}

		req.user.isloggedin = true;
		res.render('web/seller/checkout', {
			user: [req.user],
			isBidder: req.user.role === 0,
			isSeller: req.user.role === 1,
			updateSuccess: req.session.updateSuccess,
			myProducts: myPros
		});
	} else {
		res.redirect('/');
	}
};

module.exports.mydoneproduct = async function(req, res) {
	//  Kiểm tra phải là seller không ?
	if (auth.isSeller(req, res)) {
		// let ProT = await models.product_type.findAllProT();
		let myPros = [];
		myPros = await models.product.findAllWinnedProducts(1);

		if (req.session.updateSuccess == null) {
			req.session.updateSuccess = false;
		}

		req.user.isloggedin = true;
		res.render('web/seller/mydoneproduct', {
			user: [req.user],
			isBidder: req.user.role === 0,
			isSeller: req.user.role === 1,
			updateSuccess: req.session.updateSuccess,
			myProducts: myPros
		});
	} else {
		res.redirect('/');
	}
};

module.exports.add = async (req, res, next) => {
	const productname = req.body.productname;
	const product_typeID = req.body.selcat;
	const product_price = req.body.product_price;
	const product_stepcost = req.body.product_stepcost;
	const product_buynowprice = req.body.product_buynowprice;
	const product_description = req.body.product_description;
	console.log(req.body.expdate);

	let localCurrDate = new Date().toLocaleString('vi-VN', {
		timeZone: 'Asia/Ho_Chi_Minh'
	});
	let localExpdate = new Date(req.body.expdate).toLocaleString('vi-VN', {
		timeZone: 'Asia/Ho_Chi_Minh'
	});

	console.log(localExpdate);
	models.product
		.create({
			start_date: new Date(localCurrDate),
			expriry_date: new Date(localExpdate),
			product_name: productname,
			initial_price: product_price,
			description: product_description,
			imme_buy_price: product_buynowprice,
			step_cost: product_stepcost,
			auto_extend: 0,
			productTypeId: product_typeID,
			sellerId: req.user.id
		})
		.then(newlyPro => {
			let fileMainImg = req.files['main_img'];
			let filesAltImg = req.files['alt_imgs'];

			// Lưu các thông tin img vào db
			models.product_img.createFromArr(fileMainImg, true, newlyPro.id);
			models.product_img.createFromArr(filesAltImg, false, newlyPro.id);
		});
	// console.log('files img: ' + req.files);

	console.log('ĐÃ LƯU PRODUCT MOI');

	next();
};

module.exports.edit_desc = async function(req, res, next) {
	// res.send('<h1>Thanh cong</h1>');
	let proId = req.params.id;
	let content = req.body.product_description;
	console.log(content);

	await models.product.appendDescription(proId, content);
	// res.jsonp({ success: true});
	console.log('update xong');
	res.redirect('/seller/myproduct');
	// req.session.updateSuccess = true;
	// next();
};

module.exports.deny_bid = async function(req, res, next) {
	// res.send('<h1>Thanh cong</h1>');
	let proId = req.params.proId;
	let bidderId = req.params.bidderId;
	let price = req.body.price;

	await models.bid_details.destroy({
		where: {
			productId: proId,
			userId: bidderId,
			price: price
		}
	});

	// Nguoi mua se khong the dau gia san pham nay nua (push to black list)
	await models.blacklist.pushToBlackList(bidderId, proId);

	// Cập nhật giá hiện tại cho sản phẩm
	let HiggestBidder = await models.bid_details.findTheHighestBidder(proId);
	// console.log('+++++++++++++++++++++++ Người cao nhất: ',HiggestBidder)
	if (HiggestBidder[0].price === undefined) HiggestBidder[0].price = 0;

	// console.log('<<<<<<<<<<<<<<<<<<<<<<<< Giá cao nhất: ',HiggestBidder[0].price)
	await models.product.update(
		{
			curr_price: HiggestBidder[0].price
		},
		{
			where: {
				id: proId
			}
		}
	);

	console.log('Xóa thành công');
	res.jsonp({ success: true });
};

module.exports.rating = async function(req, res, next) {
	// res.send('<h1>Thanh cong</h1>');
	let bidderId = req.params.winnerId;
	let sellerId = req.user.id;
	let vote = req.body.rating;
	let content = req.body.content;

	await models.feedback.create({
		sellerId: sellerId,
		bidderId: bidderId,
		vote: vote,
		content: content
	});

	let bidderInstance = await models.user.findByPk(bidderId);

	if (vote == 1) {
		await models.user.update(
			{
				like_count: bidderInstance.like_count + 1
			},
			{
				returning: false,
				where: { id: bidderId }
			}
		);
	} else {
		await models.user.update(
			{
				report_count: bidderInstance.report_count + 1
			},
			{
				returning: false,
				where: { id: bidderId }
			}
		);
	}

	console.log('rating xong');
	res.redirect('/seller/mydoneproduct');
};

module.exports.remove_deal = async function(req, res, next) {
	// res.send('<h1>Thanh cong</h1>');
	let bidderId = req.params.winnerId;
	let proId = req.params.proId;

	console.log(bidderId + '  -  ' + proId);

	await models.product.update(
		{
			winnerId: null
		},
		{
			returning: false,
			where: { id: proId }
		}
	);

	console.log('remove_deal xong');
	res.redirect('/seller/mydoneproduct');
};
