module.exports = function(sequelize, Sequelize) {
    var ProductType = sequelize.define('product_type', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        protype_name: {
            type: Sequelize.STRING
        }
    });
    ProductType.findAllProT = function() {
        return ProductType.findAll();
    };

    return ProductType;
};