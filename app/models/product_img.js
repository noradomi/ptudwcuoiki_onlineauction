module.exports = function(sequelize, Sequelize) {
	var ProductImg = sequelize.define('product_img', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		img_name: {
			type: Sequelize.STRING
		},
		is_main_img: {
			type: Sequelize.BOOLEAN,
			defaultValue: 0
		}
	});

	ProductImg.createFromArr = function(files, isMainImg, proId) {
		files.forEach(async f => {
			await ProductImg.create({
				img_name: f.filename,
				is_main_img: isMainImg ? 1 : 0,
				productId: proId
			});
		});
	};

	return ProductImg;
};
