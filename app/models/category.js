module.exports = function(sequelize, Sequelize) {
	var Category = sequelize.define('category', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		cat_name: {
			type: Sequelize.TEXT
		},

		status: {
			type: Sequelize.ENUM('active', 'inactive'),
			defaultValue: 'active'
		}
	});

	Category.categoriesAndChild = async function() {
		let res = await Category.findAll();
		res.forEach(c => {
			c.hasChildCates = false;
			c.getProductTypes().then(childCates => {
				if (childCates.length !== 0) {
					c.hasChildCates = true;
					c.childCates = childCates;
				}
			});
		});
		return res;
	};

	return Category;
};
