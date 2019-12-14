// Modules cai dat
const express = require('express');
const exphbs = require('express-handlebars');
const express_handlebars_sections = require('express-handlebars-sections');
const session = require('express-session');
const Passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');

// Modules tu viet: Routers
const authRoute = require('./app/routes/auth.route');

const port = 3000;
const app = express();

// Config cho PassportJS
// require('./app/configs/passport')(Passport);

var env = require('dotenv').config();

// View template engine
app.engine(
	'.hbs',
	exphbs({
		defaultLayout: 'main',
		extname: '.hbs',
		section: express_handlebars_sections(),
		helpers: {
			section: function(name, options) {
				if (!this._sections) {
					this._sections = {};
				}
				this._sections[name] = options.fn(this);
				return null;
			}
		}
	})
);
app.set('view engine', '.hbs');
app.set('views', './app/views');

// Sử dụng static resource
app.use(express.static('public'));

// Config cho req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(
	session({
		cookie: { maxAge: 60000 * 30 * 24 },
		secret: 'finalproject',
		resave: true,
		saveUninitialized: true
	})
);

// Init PassportJS
app.use(Passport.initialize());
app.use(Passport.session());

// Dùng cho validate và trả về lỗi
app.use(validator());
app.use(flash());

app.use('/auth', authRoute);

//Models
var models = require('./app/models');

var Product = models.product;

//  Routes
app.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		let Pro2 = [],
			Pro4 = [],
			Pro6 = [];
		Product.findAll({
			where: {
				categoryId: 2
			}
		}).then(function(pros) {
			pros.forEach(p => {
				Pro2.push(p);
			});
		});

		Product.findAll({
			where: {
				categoryId: 4
			}
		}).then(function(pros) {
			pros.forEach(p => {
				Pro4.push(p);
			});
		});

		Product.findAll({
			where: {
				categoryId: 6
			}
		}).then(function(pros) {
			pros.forEach(p => {
				Pro6.push(p);
			});
		});

		res.render('web/homepage', {
			Pro2: Pro2,
			Pro4: Pro4,
			Pro6: Pro6
		});
	} else {
		res.redirect('auth/login');
	}
});

app.use('/auth', authRoute);


//Models
var models = require('./app/models');

//load passport strategies
require('./app/configs/passport.js')(Passport, models.user);

//Sync Database
models.sequelize
	.sync()
	.then(function() {
		console.log('Nice! Database looks fine');
	})
	.catch(function(err) {
		console.log(err, 'Something went wrong with the Database Update!');
	});

// Product.findOne({
// 	where: {
// 		id: 1
// 	}
// }).then(function(pro) {
// 	if (pro) {
// 		console.log('Ngay bat dau: ' + pro.start_date);
// 		console.log(typeof pro.start_date);
// 		var date = new Date('October 13, 2014 11:13:00');
// 		var month = date.getSeconds();
// 		console.log('Ngay het han: ' + month);
// 		console.log(typeof new Date(pro.expriry_date));
// 	} else {
// 		console.log('Loi product');
// 	}
// });

app.listen(port, () => console.log(`Server listen on port ${port}!`));
