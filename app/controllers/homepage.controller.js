const models = require('../models');

module.exports = async (req, res) => {
	Pro2 = await models.product.findByProductTypeId(2);
	Pro4 = await models.product.findByProductTypeId(4);
	//  Top 5 sản phẩm có giá cao nhất (? tạm thời lấy giá khởi tạo ban đầu)
	Pro6 = await models.product.top5PricingProducts(6);

	Cat = await models.category.categoriesAndChild();
	if (req.isAuthenticated()) {
		models.user
			.findOne({
				where: {
					id: req.session.passport.user
				}
			})
			.then(dbUser => {
				let user = [
					{
						userInfo: dbUser.dataValues,
						id: req.session.passport.user,
						isloggedin: req.isAuthenticated()
					}
				];
				res.render('web/homepage', {
					user: user,
					Pro2: Pro2,
					Pro4: Pro4,
					Pro6: Pro6,
					Cat: Cat
				});
			});
	} else {
		let user = [
			{
				isloggedin: false
			}
		];
		res.render('web/homepage', {
			user: user,
			Pro2: Pro2,
			Pro4: Pro4,
			Pro6: Pro6,
			Cat: Cat
		});
	}
};
