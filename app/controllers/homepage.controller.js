const models = require('../models');

module.exports = async (req, res) => {
	if (req.isAuthenticated()) {
		Pro2 = await models.product.findByProductTypeId(2);
		Pro4 = await models.product.findByProductTypeId(4);
		//  Top 5 sản phẩm có giá cao nhất (? tạm thời lấy giá khởi tạo ban đầu)
		Pro6 = await models.product.top5PricingProducts(6);

		Cat = await models.category.categoriesAndChild();

		res.render('web/homepage', {
			Pro2: Pro2,
			Pro4: Pro4,
			Pro6: Pro6,
			Cat: Cat
		});
	} else {
		res.redirect('auth/login');
	}
};
