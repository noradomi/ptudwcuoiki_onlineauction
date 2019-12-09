const localStrategy = require('passport-local').Strategy;
const bCrypt = require('bcryptjs');

module.exports = function(passport, user) {
	var User = user;

	var LocalStrategy = require('passport-local').Strategy;

	//LOCAL REGISTER
	passport.use(
		'local-register',
		new LocalStrategy(
			{
				usernameField: 'email',

				passwordField: 'password',

				passReqToCallback: true // cho phép chuyển toàn bộ yêu cầu đến callback, đặc biệt hữu ích khi đăng ký.
			},

			function(req, email, password, done) {
				var generateHash = function(password) {
					return bCrypt.hashSync(
						password,
						bCrypt.genSaltSync(8),
						null
					);
				};

				User.findOne({
					where: {
						email: email
					}
				}).then(function(user) {
					var data = {
						username: req.body.username,

						password: password,

						email: email,

						firstname: req.body.firstname,

						lastname: req.body.lastname
					};

					if (user) {
						req.flash('dataForm', data);
						return done(
							null,
							false,
							req.flash('errors', 'That email is already taken.'),
							req.flash('dataForm', data)
						);
					} else {
						var userPassword = generateHash(password);

						data.password = userPassword;

						User.create(data).then(function(newUser, created) {
							if (!newUser) {
								return done(null, false);
							}

							if (newUser) {
								return done(null, newUser);
							}
						});
					}
				});
			}
		)
	);

	//LOCAL SIGNIN
	passport.use(
		'local-signin',
		new LocalStrategy(
			{
				usernameField: 'username',

				passwordField: 'password',

				passReqToCallback: true
			},

			function(req, username, password, done) {
				var User = user;

				var isValidPassword = function(userpass, password) {
					return bCrypt.compareSync(password, userpass);
				};

				User.findOne({
					where: {
						username: username
					}
				})
					.then(function(user) {
						dataForm = {
							username: username,
							password: password
						};
						if (!user) {
							return done(
								null,
								false,
								req.flash('errors', 'Username does not exist.'),
								req.flash('dataForm', dataForm)
							);
						}

						if (!isValidPassword(user.password, password)) {
							return done(
								null,
								false,
								req.flash('errors', 'Incorrect password.'),
								req.flash('dataForm', dataForm)
							);
						}

						var userinfo = user.get();
						return done(null, userinfo);
					})
					.catch(function(err) {
						console.log('Error:', err);

						return done(
							null,
							false,
							req.flash(
								'errors',
								'Something went wrong with your Signin.'
							),
							req.flash('dataForm', dataForm)
						);
					});
			}
		)
	);

	//serialize
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// deserialize user
	passport.deserializeUser(function(id, done) {
		User.findByPk(id).then(function(user) {
			if (user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		});
	});
};
