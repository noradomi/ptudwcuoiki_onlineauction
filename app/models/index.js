'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'configs', 'config.json'))[env];
var sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);
var db = {};

fs.readdirSync(__dirname)
	.filter(function(file) {
		return file.indexOf('.') !== 0 && file !== 'index.js';
	})
	.forEach(function(file) {
		var model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

// Associations

// Product
db.product.hasMany(db.bid_details);
db.product.belongsTo(db.product_type);

// Category
db.category.hasMany(db.product_type, { as: 'ProductTypes' });

// ProductType
db.product_type.belongsTo(db.category);
db.product_type.hasMany(db.product);

// User
db.user.hasMany(db.bid_details);

// BidDetails
db.bid_details.belongsTo(db.product);
db.bid_details.belongsTo(db.user);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Tạo FUllText Index bảng Product cho FUll Text Search
db.sequelize.query('ALTER TABLE PRODUCTS ADD FULLTEXT(product_name)');

module.exports = db;
