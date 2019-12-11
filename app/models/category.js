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

	return Category;
};
