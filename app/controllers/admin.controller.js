const models = require("../models");

module.exports.category = async function(req, res) {
    if (req.user.role === 2) {
        let Cats = await models.category.categoriesAndChild();
        let PTs = await models.product_type.findAllProT();
        res.render("web/admin-category", {
            user: [req.user],
            layout: "admin-main.hbs",
            title: "Categories management",
            Cats: Cats,
            PTs: PTs
        });
    } else {
        res.redirect("/");
    }
};

module.exports.product = async(req, res) => {
    if (req.user.role === 2) {
        let Products = await models.product.findAllPro();
        res.render("web/admin-product", {
            layout: "admin-main.hbs",
            title: "Products management",
            Products: Products,
            user: [req.user]
        });
    } else {
        res.redirect("/");
    }
};

module.exports.deleteProduct = async(req, res, next) => {
    await models.product.delete(req.query.id);
    res.redirect("/admin/product/");
};

//

module.exports.fillCategory = (req, res) => {
    if (req.user.role === 2) {
        res.render("web/admin-fillCategory", {
            layout: "admin-main.hbs",
            title: "Categories management",
            user: [req.user],
        });
    } else {
        res.redirect("/");
    }
};

module.exports.addCategory = async(req, res, next) => {
    await models.category.addCat(req.body.cat_name);
    res.redirect("/admin/category/");
};

module.exports.fillUpdateCategory = (req, res) => {
    if (req.user.role === 2) {
        res.render("web/admin-fillCategory", {
            layout: "admin-main.hbs",
            title: "Categories management",
            user: [req.user],
        });
    } else {
        res.redirect("/");
    }
};

module.exports.updateCategory = async(req, res, next) => {
    await models.category.updateCat(req.query.id, req.body.cat_name);
    res.redirect("/admin/category/");
};

module.exports.deleteCategory = async(req, res, next) => {
    await models.category.delete(req.query.id);
    res.redirect("/admin/category/");
};

//

module.exports.fillProductType = (req, res) => {
    if (req.user.role === 2) {
        res.render("web/admin-fillCategory", {
            layout: "admin-main.hbs",
            title: "Categories management",
            user: [req.user],
        });
    } else {
        res.redirect("/");
    }
};

module.exports.addProductType = async(req, res, next) => {
    await models.product_type.add(req.body.cat_name);
    res.redirect("/admin/category/");
};

module.exports.fillUpdateProductType = (req, res) => {
    if (req.user.role === 2) {
        res.render("web/admin-fillCategory", {
            layout: "admin-main.hbs",
            title: "Categories management",
            user: [req.user],
        });
    } else {
        res.redirect("/");
    }
};

module.exports.updateProductType = async(req, res, next) => {
    await models.product_type.update(req.query.id, req.body.cat_name);
    res.redirect("/admin/category/");
};

module.exports.deleteProductType = async(req, res, next) => {

    await models.product_type.delete(req.query.id);
    res.redirect("/admin/category/");
};
module.exports.findAllBidder = async(req, res, next) => {
    let Bidder = await models.bid_details.findAllBidder();
    res.render("web/admin-bidder", {
        layout: "admin-main.hbs",
        title: "Bidder management",
        user: [req.user],
        Bidder: Bidder
    });
}

module.exports.findAllUserUpgrade = async(req, res, next) => {
    let UserUpgrade = await models.user.findUserUpgrade();
    res.render("web/admin-userupgrade", {
        layout: "admin-main.hbs",
        title: "USER WANT TO UPGRADE",
        user: [req.user],
        UserUpgrade: UserUpgrade
    });
}

module.exports.upbiddertoseller = async(req, res, next) => {
    await models.user.upgradeBidderToSeller(req.query.id);
    res.redirect("/admin/userupgrade/");
};