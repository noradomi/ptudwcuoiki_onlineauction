const db = require('../models');
var Product = db.product;
var Category = db.category;
var bid_details = db.bid_details;

module.exports.search = async(req, res) => {
    // Lấy query từ req.
    const query = req.query.q;
    const ptId = req.query.selcat;

    console.log('Ket qua query : ' + req.query.selsort);

    let results = await db.product.searchAllByFTS(query, ptId);

    console.log(results);

    results.forEach(p => {
        //  Đánh dấu các sản phẩm mới đăng (trong vòng N phút) bằng thuộc tính isNew
        p.isNew = db.product.isNewProduct(p.start_date, 60); // 60 phút
    });

    let Cats = await db.category.categoriesAndChild();

    res.render('web/searproduct', {
        pros: results,
        query: query,
        countPros: results.length,
        Cat: Cats
    });
};
// PRODUCT DETAIL
module.exports.productdetail = async(req, res) => {
    var id = req.params.id;
    let ProTId = await db.product.findProductTypeIdById(id);
    // let Pro = [];
    let Bid = [];
    let ProRelate = await db.product.findRelatedProduct(ProTId, id);
    let HistoryBid = await db.bid_details.findAllHistory(id);
    let Seller = await db.product.findProSeller(id);

    if (HistoryBid.length > 0) {
        // Gắn cờ cho người đang đấu giá cao nhất
        HistoryBid.forEach(h => (h.isTop = false));
        HistoryBid[0].isTop = true;
    }

    let HiggestBidder = await db.bid_details.findTheHighestBidder(id);

    let Pro = await db.product.findByPk(id);

    if (req.isAuthenticated()) {
        req.user.isloggedin = true;
        // Pro.forEach(p => {
        // 	p.isBidder = req.user.role === 0;
        // 	p.isSeller = req.user.role === 1;
        // });
        isOwner = await db.product.isSellerOfProduct(id, req.user.id);

        res.render('./web/productdetail', {
            user: [req.user],
            isBidder: req.user.role === 0,
            isSeller: req.user.role === 1,
            isOwner: isOwner,
            Pro: [Pro],
            ProRelate: ProRelate,
            HistoryBid: HistoryBid,
            HiggestBidder: HiggestBidder,
            Seller: Seller
        });
    } else {
        res.render('./web/productdetail', {
            user: [req.user],
            Pro: [Pro],
            isBidder: false,
            isSeller: false,
            isOwner: false,
            ProRelate: ProRelate,
            HistoryBid: HistoryBid,
            HiggestBidder: HiggestBidder,
            Seller: Seller
        });
    }
};

module.exports.product = async(req, res) => {
    let Pro4 = await db.product.findByProductTypeId(6);
    let ProTName = await db.product.findProductTypeIdNameByID(6);
    res.render('./web/product', {
        Pro4: Pro4,
        ProTName: ProTName
    });
};