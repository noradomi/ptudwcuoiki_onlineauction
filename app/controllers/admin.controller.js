const models = require("../models");

module.exports.category = async function(req, res) {
    if (req.user.role === 2) {
        let Cats = await models.category.categoriesAndChild();
        let PTs = await models.product_type.findAllProT();
        res.render("web/admin-category", {
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
            Products: Products
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
            title: "Categories management"
        });
    } else {
        res.redirect("/");
    }
};

module.exports.addCategory = async(req, res, next) => {
    await models.category.addCat(req.body.cat_name);
    res.redirect("/admin/category/");
};

module.exports.fillUpdateCategory = async (req, res) => {
    if (req.user.role === 2) {
        const C = await models.category.findById(req.query.id);
        res.render("web/admin-fillCategory", {
            layout: "admin-main.hbs",
            title: "Categories management",
            C: C
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

module.exports.fillProductType = async (req, res) => {
    if (req.user.role === 2) {
        const Cats = await models.category.categoriesAndChild();
        res.render("web/admin-fillProductType", {
            layout: "admin-main.hbs",
            title: "Categories management",
            Cats: Cats
        });
    } else {
        res.redirect("/");
    }
};

module.exports.addProductType = async(req, res, next) => {
    await models.product_type.add(req.body.pt_name, req.body.cat_id);
    res.redirect("/admin/category/");
};

module.exports.fillUpdateProductType = async (req, res) => {
    if (req.user.role === 2) {
        const Cats = await models.category.categoriesAndChild();
        const PT = await models.product_type.findById(req.query.id);
        console.log(PT);
        res.render("web/admin-fillProductType", {
            layout: "admin-main.hbs",
            title: "Categories management",
            PT: PT,
            Cats: Cats
        });
    } else {
        res.redirect("/");
    }
};

module.exports.updateProductType = async(req, res, next) => {
    await models.product_type.update(req.query.id, req.body.pt_name, req.body.cat_id);
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
