module.exports = function(sequelize, Sequelize) {
	var Product = sequelize.define(
		'product',
		{
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
			},
			curr_price: {
				type: Sequelize.INTEGER,
				defaultValue: 0
			},
			like_count: {
				type: Sequelize.INTEGER,
				defaultValue: 0
			},
			report_count: {
				type: Sequelize.INTEGER,
				defaultValue: 0
			},
			status: {
				type: Sequelize.ENUM('active', 'inactive'),
				defaultValue: 'active'
			}
		},
		{
			indexes: [
				// add a FULLTEXT index
				{ type: 'FULLTEXT', name: 'text_idx', fields: ['product_name'] }
			]
		}
	);

	// Hàm tìm kiếm bằng Full-Text Search
	Product.searchAllByFTS = async function(query, ptId) {
		let sql = `SELECT * FROM products WHERE MATCH(product_name) AGAINST ('${query}*' IN BOOLEAN MODE)`;
		if (parseInt(ptId) !== 0) {
			sql += ` AND productTypeId = ${ptId}`;
		}
		return sequelize.query(sql, {
			type: sequelize.QueryTypes.SELECT
		});
	};

	Product.isNewProduct = function(sd, N) {
		let startday =
			new Date(`${sd}`).getTime() +
			new Date(`${sd}`).getTimezoneOffset() * 60 * 1000;
		let currdate = new Date().getTime();

		let miliseconds_left = currdate - startday;
		if (miliseconds_left <= N * 60 * 1000) return true;
		else return false;
	};

	Product.isExprired = function(exd) {
		let exprirydate =
			new Date(`${exd}`).getTime() +
			new Date(`${exd}`).getTimezoneOffset() * 60 * 1000;
		let currdate = new Date().getTime();

		return exprirydate <= currdate;
	};

	Product.top5PricingProducts = function() {
		return Product.findAll({
			limit: 5,
			order: [[sequelize.col('initial_price'), 'DESC']]
		});
	};

	Product.findByProductTypeId = function(id) {
		return Product.findAll({ where: { productTypeId: id } });
	};

	return Product;
};
