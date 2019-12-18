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

	WatchList.actWatchList = async function(userId, proId) {
		let record = await WatchList.findOne({
			where: { productId: proId, userId: userId }
		});

		// console.log(record.dataValues);

		if (record === null) {
			WatchList.create({
				productId: proId,
				userId: userId
			});
		} else {
			console.log(record.dataValues.status);

			let status =
				record.dataValues.status === 'active' ? 'inactive' : 'active';
			WatchList.update(
				{
					status: status
				},
				{
					returning: false,
					where: { productId: proId, userId: userId }
				}
			);
		}
	};

	return WatchList;
};
