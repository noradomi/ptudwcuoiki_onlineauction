module.exports = function(sequelize, Sequelize) {
  var ProductType = sequelize.define("product_type", {
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

  ProductType.add = async cat_name => {
    let sql = `INSERT INTO product_types(protype_name, createdAt, updatedAt) VALUES ('${cat_name}', now(), now())`;
    return sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT
    });
  };

  ProductType.update = async (cat_id, cat_name) => {
    let sql = `UPDATE product_types SET protype_name = '${cat_name}' WHERE id = '${cat_id}';`;
    return sequelize.query(sql, {
      type: sequelize.QueryTypes.UPDATE
    });
  };

  ProductType.delete = async idProductType => {
    let sql = `DELETE FROM product_types pt WHERE pt.id = '${idProductType}' AND NOT EXISTS (SELECT * FROM products p WHERE p.productTypeId = pt.id)`;
    await sequelize.query(sql, {
      type: sequelize.QueryTypes.DELETE
    });
  };

  return ProductType;
};
