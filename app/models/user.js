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
			type: Sequelize.STRING,
			allowNull: false
		},

		role: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},

		status: {
			type: Sequelize.ENUM('active', 'inactive'),
			defaultValue: 'active'
		}
	});

	return User;
};
