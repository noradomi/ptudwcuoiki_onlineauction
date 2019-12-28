module.exports = function(sequelize, Sequelize) {
	var BidDetails = sequelize.define('bid_details', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		time: {
			type: Sequelize.DATE,
			notEmpty: true
		},

		price: {
			type: Sequelize.INTEGER,
			notEmpty: true
		}
	});
	BidDetails.findAllHistory = function(id) {
		let sql = `SELECT * FROM bid_details b,users s WHERE b.productId = ${id} AND b.userId = s.id order by price desc`;

		return sequelize.query(sql, {
			type: sequelize.QueryTypes.SELECT
		});
	};
	BidDetails.findTheHighestBidder = function(id) {
		let sql = `SELECT * FROM bid_details b,users s WHERE b.productId = ${id} AND b.userId = s.id ORDER BY b.price DESC LIMIT 1 `;
		return sequelize.query(sql, {
			type: sequelize.QueryTypes.SELECT
		});
	};

	BidDetails.countBiddersOfProduct = async function(proId) {
		let sql =
			'SELECT COUNT(DISTINCT userId) as count FROM BID_DETAILS WHERE productId = ' +
			proId;
		let res = await sequelize.query(sql, {
			type: sequelize.QueryTypes.SELECT
		});
		return res[0].count;
	};
	return BidDetails;
};
