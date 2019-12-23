const db = require('../models');
var Product = db.product;
var Category = db.category;
var bid_details = db.bid_details;

module.exports.search = async (req, res) => {
	// Lấy query từ req.
	const query = req.query.q;
	const ptId = req.query.selcat;

	console.log('Ket qua query : ' + req.query.selsort);

	let results = await db.product.searchAllByFTS(query, ptId);

	console.log(results);

	results.forEach(p => {
		//  Đánh dấu các sản phẩm mới đăng (trong vòng N phút) bằng thuộc tính isNew
		p.isNew = db.product.isNewProduct(p.start_date, 60); // 60 phút
	});

	let Cats = await db.category.categoriesAndChild();

	res.render('web/searproduct', {
		pros: results,
		query: query,
		countPros: results.length,
		Cat: Cats
	});
};
// PRODUCT DETAIL
module.exports.productdetail = async (req, res) => {
	// Kiêm tra đăng nhập chưa để render ra header thích hợp
	let user = [];
	if (req.isAuthenticated()) {
		user.push({
			userInfo: req.user,
			id: req.session.passport.user,
			isloggedin: true
		});
	} else {
		user.push({
			isloggedin: false
		});
	}

	var id = req.params.id;
	let ProTId = await db.product.findProductTypeIdById(id);
	let Pro = [];
	let Bid = [];
	let ProRelate = await db.product.findRelatedProduct(ProTId, id);
	let HistoryBid = await db.bid_details.findAllHistory(id);

	if (HistoryBid.length > 0) {
		// Gắn cờ cho người đang đấu giá cao nhất
		HistoryBid.forEach(h => (h.isTop = false));
		HistoryBid[0].isTop = true;
	}

	let HiggestBidder = await db.bid_details.findTheHighestBidder(id);
	Product.findAll({
		where: {
			id: id
		}
	}).then(function(pros) {
		pros.forEach(p => {
			Pro.push(p);
		});
	});

	res.render('./web/productdetail', {
		user: user,
		Pro: Pro,
		ProRelate: ProRelate,
		HistoryBid: HistoryBid,
		HiggestBidder: HiggestBidder
	});
};

module.exports.product = async (req, res) => {
	let Pro4 = await db.product.findByProductTypeId(6);
	let ProTName = await db.product.findProductTypeIdNameByID(6);
	res.render('./web/product', {
		Pro4: Pro4,
		ProTName: ProTName
	});
};
