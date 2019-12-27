const db = require('../models');
const auth = require('../middleware/auth.middleware');

module.exports.actWatchList = async (req, res, next) => {
	// Kiểm tra có phải là bidder không
	if (!auth.isBidder(req, res)) {
		console.log('Khong phai la bidder');
		res.jsonp({ success: false });
	} else {
		const userId = req.user.id;
		const proId = req.params.proid;

		let type = await db.watchlist.actWatchList(userId, proId); // 1: thêm, 0: xóa

		console.log(type);

		res.jsonp({ success: true, type: type });
	}
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

	// Cập nhật thông tin người thắng hiện tại
	db.product.update(
		{
			winnerId: userId
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
