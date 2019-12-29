const models = require('../models');

module.exports = async(req, res) => {
    Pro2 = await models.product.top5NearlyExpiriedProducts();
    Pro4 = await models.product.top5BiddedProducts();
    //  Top 5 sản phẩm có giá cao nhất (? tạm thời lấy giá khởi tạo ban đầu)
    Pro6 = await models.product.top5PricingProducts();

    Cat = await models.category.categoriesAndChild();

    Pro2.forEach(async p => {
        p.countBidders = await models.bid_details.countBiddersOfProduct(p.id);
    });

    Pro4.forEach(async p => {
        p.countBidders = await models.bid_details.countBiddersOfProduct(p.id);
    });

    Pro6.forEach(async p => {
        p.countBidders = await models.bid_details.countBiddersOfProduct(p.id);
    });

    console.log(
        '>>>>>>>>>>>>>>>> So hien tai',
        await models.bid_details.countBiddersOfProduct(6)
    );

    if (req.isAuthenticated()) {
        console.log('>>>>>>>>>>>>>>>> ', req.user);
        req.user.isloggedin = true;
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
            res.render('web/homepage', {
                user: [req.user],
                isBidder: req.user.role === 0,
                isSeller: req.user.role === 1,
                Pro2: Pro2,
                Pro4: Pro4,
                Pro6: Pro6,
                Cat: Cat
            });
        }
    } else {
        let user = [{
            isloggedin: false
        }];
        res.render('web/homepage', {
            user: user,
            Pro2: Pro2,
            Pro4: Pro4,
            Pro6: Pro6,
            Cat: Cat
        });
    }
};