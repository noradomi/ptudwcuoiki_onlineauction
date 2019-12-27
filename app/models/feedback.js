module.exports = function(sequelize, Sequelize) {
	var FeedBack = sequelize.define('feedback', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		sellerId: {
			type: Sequelize.INTEGER,
			notEmpty: true
		},

		bidderId: {
			type: Sequelize.INTEGER,
			notEmpty: true
		},
		content: {
			type: Sequelize.TEXT
		},
		vote: {
			type: Sequelize.BOOLEAN
		}
	});

	return FeedBack;
};
