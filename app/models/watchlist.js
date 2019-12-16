module.exports = function(sequelize, Sequelize) {
	var WatchList = sequelize.define('watchlist', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		status: {
			type: Sequelize.ENUM('active', 'inactive'),
			defaultValue: 'active'
		}
	});

	return WatchList;
};
