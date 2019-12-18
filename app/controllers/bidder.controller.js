const db = require('../models');

module.exports.actWatchList = (req, res, next) => {
	const userId = req.user.id;

	const proId = req.params.proid;

	db.watchlist.actWatchList(userId, proId);
};
