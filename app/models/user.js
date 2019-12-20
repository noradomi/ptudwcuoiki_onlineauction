
module.exports = function(sequelize, Sequelize) {
	var User = sequelize.define('user', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		firstname: {
			type: Sequelize.STRING,
			notEmpty: true
		},

		lastname: {
			type: Sequelize.STRING,
			notEmpty: true
		},

		username: {
			type: Sequelize.TEXT
		},

		email: {
			type: Sequelize.STRING,
			validate: {
				isEmail: true
			}
		},

		address: {
			type: Sequelize.TEXT
		},

		password: {
			type: Sequelize.STRING
		},

		role: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},

		facebook_id: {
			type: Sequelize.STRING
		},

		facebook_token: {
			type: Sequelize.STRING,
			default: ''
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
	});

	User.isEnableToBid = function(user) {
		// Bidder chưa từng được đánh giá -> Được quyền ra giá (trong trường hợp người bán cho phép - tạm thời không quan tâm cái này)
		if (user.like_count === 0 && user.report_count === 0) return true;

		let rating = Math.floor(
			user.like_count / (user.like_count + user.report_count)
		);
		if (rating >= 0.8) return true;
		return false;
	};

	User.EditProfile = function(user){
		return User.update({
			firstname: user.firstname,
			lastname: user.lastname,
			username: user.username,
			address: user.address,
		  }, {
			where: {
			  id: user.id,
			}
		  });
	}

	User.Activate = function(user){
		return User.update({
			status: 'active',
		},{
			where: {
				id: user.id,
			}
		});
	}

	User.Deactivate = function(user){
		return User.update({
			status: 'inactive',
		},{
			where:{
				id:user.id,
			}
		});
	}

	User.ChangeEmail = function(user){
		return User.update({
			email: user.email,
			status: 'inactive',
		},{
			where:{
				id: user.id,
			}
		});
	}

	User.ChangePassword = function(user){
		return User.update({
			password: user.password,
		},{
			where: {
				id: user.id,
			}
		});
	}

	return User;
};
