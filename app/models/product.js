module.exports = function(sequelize, Sequelize) {
	var Product = sequelize.define('product', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		start_date: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},

		expriry_date: {
			type: Sequelize.DATE
		},

		product_name: {
			type: Sequelize.STRING,
			notEmpty: true
		},

		initial_price: {
			// giá khởi điểm
			type: Sequelize.INTEGER,
			notEmpty: true
		},

		description: {
			type: Sequelize.TEXT
		},

		imme_buy_price: {
			// giá mua ngay
			type: Sequelize.INTEGER
		},

		step_cost: {
			// bước giá
			type: Sequelize.INTEGER,
			defaultValue: 0
		},

		auto_extend: {
			type: Sequelize.BOOLEAN, // có tự động gia hạn thêm thời gian đấu giá không ?
			default: '0'
		}
	});

	return Product;
};
