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

	return BidDetails;
};
