const db = require('../models');

module.exports.search = async (req, res) => {
	// Lấy query từ req.
	const query = req.query.q;
	const ptId = req.query.selcat;

	console.log('Thông tin user trong session: ' + req.user);

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
