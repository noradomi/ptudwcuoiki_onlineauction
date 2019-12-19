const db = require('../models');

module.exports.actWatchList = (req, res, next) => {
	const userId = req.user.id;

	const proId = req.params.proid;

	db.watchlist.actWatchList(userId, proId);
};

module.exports.bid = (req, res, next) => {
	const userId = req.user.id;

	const proId = req.params.proid;

	const bidPrice = req.body.bidPrice;

	// Lưu thông tin đấu giá vào bảng bid_details
	db.bid_details.create({
		time: new Date(),
		price: bidPrice,
		productId: proId,
		userId: userId
	});

	// Cập nhật giá hiện tại của product
	db.product.update(
		{
			curr_price: bidPrice
		},
		{
			returning: false,
			where: { id: proId }
		}
	);

	// db.watchlist.actWatchList(userId, proId);
	console.log('ĐÃ LƯU : Bid cho product ' + proId + ' boi bidder ' + userId);

	res.redirect(`/product/productdetail/7`);
};
