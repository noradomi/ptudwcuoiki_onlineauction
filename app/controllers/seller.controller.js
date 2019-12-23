const models = require('../models');

module.exports.productname = async (req, res) => {
	let ProT = await models.product_type.findAllProT();
	res.render('web/sellerproduct', {
		ProT: ProT
	});
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
			productTypeId: product_typeID
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
