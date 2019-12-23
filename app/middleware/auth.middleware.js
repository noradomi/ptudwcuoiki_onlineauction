module.exports = function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();

	res.redirect('/auth/login');
};

module.exports.isBidder = function(req, res) {
	if (req.isAuthenticated()) {
		console.log('Da dang nhap');
		if (req.user.role === 0) return true;
		else return false;
	} else return false;
};
