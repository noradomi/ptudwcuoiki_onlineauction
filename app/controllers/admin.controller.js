const models = require("../models");

module.exports.category = async function(req, res) {
  let Cats = await models.category.categoriesAndChild();
  let PTs = await models.product_type.findAllProT();
  res.render("web/admin-category", {
    layout: "admin-main.hbs",
    title: "Categories management",
    Cats: Cats,
    PTs: PTs
  });
};

module.exports.product = async (req, res) => {
  let Products = await models.product.findAllPro();
  res.render("web/admin-product", {
    layout: "admin-main.hbs",
    title: "Products management",
    Products: Products
  });
};

module.exports.deleteProduct = async (req, res, next) => {
  await models.product.delete(req.query.id);
  res.redirect("/admin/product/");
};

//

module.exports.fillCategory = (req, res) => {
  res.render("web/admin-fillCategory", {
    layout: "admin-main.hbs",
    title: "Categories management"
  });
};

module.exports.addCategory = async (req, res, next) => {
  await models.category.addCat(req.body.cat_name);
  res.redirect("/admin/category/");
};

module.exports.fillUpdateCategory = (req, res) => {
  res.render("web/admin-fillCategory", {
    layout: "admin-main.hbs",
    title: "Categories management"
  });
};

module.exports.updateCategory = async (req, res, next) => {
  await models.category.updateCat(req.query.id, req.body.cat_name);
  res.redirect("/admin/category/");
};

module.exports.deleteCategory = async (req, res, next) => {
  await models.category.delete(req.query.id);
  res.redirect("/admin/category/");
};

//

module.exports.fillProductType = (req, res) => {
  res.render("web/admin-fillCategory", {
    layout: "admin-main.hbs",
    title: "Categories management"
  });
};

module.exports.addProductType = async (req, res, next) => {
  await models.product_type.add(req.body.cat_name);
  res.redirect("/admin/category/");
};

module.exports.fillUpdateProductType = (req, res) => {
  res.render("web/admin-fillCategory", {
    layout: "admin-main.hbs",
    title: "Categories management"
  });
};

module.exports.updateProductType = async (req, res, next) => {
  await models.product_type.update(req.query.id, req.body.cat_name);
  res.redirect("/admin/category/");
};

module.exports.deleteProductType = async (req, res, next) => {
  await models.product_type.delete(req.query.id);
  res.redirect("/admin/category/");
};
