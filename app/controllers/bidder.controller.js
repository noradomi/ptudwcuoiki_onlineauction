const db = require('../models');
const auth = require('../middleware/auth.middleware');

module.exports.actWatchList = async(req, res, next) => {
    // Kiểm tra có phải là bidder không
    if (!auth.isBidder(req, res)) {
        console.log('Khong phai la bidder');
        res.jsonp({ success: false });
    } else {
        const userId = req.user.id;
        const proId = req.params.proid;

        let type = await db.watchlist.actWatchList(userId, proId); // 1: thêm, 0: xóa

        console.log(type);

        res.jsonp({ success: true, type: type });
    }
};

module.exports.bid = (req, res, next) => {
    const userId = req.user.id;
    const proId = req.params.proid;
    const bidPrice = req.body.bidPrice;
    const maxPrice = req.body.maxPrice;
    console.log('MAXXXXXXX', maxPrice == '');

    if (maxPrice == '') {
        // Lưu thông tin đấu giá vào bảng bid_details
        db.bid_details.create({
            time: new Date(),
            price: bidPrice,
            productId: proId,
            userId: userId
        });
    } else {
        db.bid_details.create({
            time: new Date(),
            price: bidPrice,
            max_price: maxPrice,
            productId: proId,
            userId: userId
        });
    }

    // Kiểm tra sản phẩm có tự động cộng thêm thời gian khi có đấu giá 5 phút cuối không ?
    console.log('>>>>>>>>>>>> Kiểm tra bonus time');
    db.product.bonusTimeProduct(proId);
    // Cập nhật giá hiện tại của product
    db.product.update({
        curr_price: bidPrice
    }, {
        returning: false,
        where: { id: proId }
    });

    // Cập nhật thông tin người thắng hiện tại
    db.product.update({
        winnerId: userId
    }, {
        returning: false,
        where: { id: proId }
    });

    // db.watchlist.actWatchList(userId, proId);
    console.log('ĐÃ LƯU : Bid cho product ' + proId + ' boi bidder ' + userId);
    res.redirect(`/product/productdetail/7`);
};

// TEST CHUC NANG 6.2
module.exports.findBiddingUserId = async(req, res, next) => {
    //const userId = req.user.id;
    //const proId = req.params.proid;
    //let userBiddingId = await db.bid_details.top1BidingUserId(8);
    let allProductId = await db.bid_details.findAllProductInBid();
    for (var i = 0; i < allProductId.length; i++) {
        console.log('PRODUCT ID IN BID DETAILS   :  ' + allProductId[i].productId);
        let higgestBidder = await db.bid_details.findTheHighestBidder2(allProductId[i].productId);
        console.log('PRICEEEEEEEEEEEEEEEE        :  ' + higgestBidder[0].userId);
        let allUserId = await db.bid_details.findAllUserInBid(allProductId[i].productId);
        // XET XEM TRONG SAN PHAM DANG XET CO PHAI LA NGUOI TOP KHONG, NEU KHONG THI DUA VAO GIA CUA 
        //BIDDER VUA MOI BID DE TANG GIA LEN SAO CHO VUA DU NHUNG DIEU KIEN LA <= giatoida
        for (var j = 0; j < allUserId.length; j++) {
            if (allUserId[j].userId === higgestBidder[0].userId) {
                //NEU DA LA CAO NHAT THI KHONG CAN CAP NHAT 
                console.log(allUserId[j].userId + 'BANGGGGGGGGGGGGGGGGGGGGGG' + higgestBidder[0].userId);
            } else {
                //NEU KHONG PHAI CAO NHAT THI DUA VAO GIA TOI DA VA GIA RA CUA THANG DAU GIA KHAC
                //HE THONG TU RA GIA
                console.log('NOOOOOOOOO');
                let max_Price = await db.bid_details.findMaxPriceUserInBid(allProductId[i].productId, allUserId[j].userId);
                console.log('MAX PRICE:    ' + max_Price[0].max_price);
                if (higgestBidder[0].price < max_Price[0].max_price) {
                    let newPrice = higgestBidder[0].price + 100000;
                    console.log('THEM VAO BID DETAILS 1 GIAO DICH BID MOI VOI: PRICE ' + newPrice);
                    await db.bid_details.create({
                        time: new Date(),
                        price: newPrice,
                        max_price: max_Price[0].max_price,
                        productId: allProductId[i].productId,
                        userId: allUserId[j].userId
                    });
                    await db.product.update({
                        curr_price: newPrice
                    }, {
                        returning: false,
                        where: { id: allProductId[i].productId }
                    });

                }
            }
            // console.log(allUserId[j].userId);
        }
    }
    // console.log(userBiddingId);
    // if (userBiddingId === 1) {
    //     console.log('AUKE AUKE');
    // } else {
    //     console.log('NO!!!!!!!!!!!');
    // }
    // console.log('USERRRRRRRRRRRRRRRRRR:     ' + userBiddingId);
    //res.redirect(`/`);
};

module.exports.watchlist = async(req, res, next) => {
    // var user = {
    //     email: req.body.email,
    //     id: req.session.passport.user,
    // }
    if (auth.isBidder(req, res)) {
        let id = req.session.passport.user;
        //let id = req.user.id;
        let WatchList = await db.watchlist.findAllProduct(id);
        Cat = await db.category.categoriesAndChild();
        req.user.isloggedin = true;
        res.render('./web/watchlist', {
            WatchList: WatchList,
            user: [req.user],
            TITLE: 'DANH SÁCH SẢN PHẨM ĐÃ ƯU THÍCH',
            Cat: Cat
        });
    } else {
        res.redirect('/');
    }
};

module.exports.mybid = async(req, res, next) => {
    //  Kiểm tra phải là bidder không ?
    if (auth.isBidder(req, res)) {
        let id = req.user.id;
        let WatchList = await db.watchlist.findAllBidProduct(id);
        WatchList.forEach(p => {
            if (p.userId == p.winnerId) p.isMyWinPro = true;
            else {
                p.tempWinnerName = p.winnerfn + ' ' + p.winnerln;
                p.isMyWinPro = false;
            }
        });

        Cat = await db.category.categoriesAndChild();
        req.user.isloggedin = true;
        res.render('./web/bidder/mybidproduct', {
            myProducts: WatchList,
            user: [req.user],
            isBidder: req.user.role === 0,
            isSeller: req.user.role === 1,
            TITLE: 'MY WINNING PRODUCT ',
            Cat: Cat
        });
    } else {
        res.redirect('/');
    }
};
module.exports.mywinpro = async(req, res, next) => {
    //  Kiểm tra phải là bidder không ?
    if (auth.isBidder(req, res)) {
        let id = req.user.id;
        let WatchList = await db.watchlist.findAllWinPro(id);
        WatchList.forEach(p => {
            p.sellerName = p.firstname + p.lastname;
        });
        Cat = await db.category.categoriesAndChild();
        req.user.isloggedin = true;
        res.render('./web/bidder/mywinningproduct', {
            myProducts: WatchList,
            user: [req.user],
            isBidder: req.user.role === 0,
            isSeller: req.user.role === 1,
            TITLE: 'MY WINNING PRODUCT ',
            Cat: Cat
        });
    } else {
        res.redirect('/');
    }
};

module.exports.addpoint = async(req, res, next) => {
    //let id = req.session.passport.user;
    let likeCount = await db.user.findLikeCountUser(2);
    db.user.update({
        like_count: likeCount + 1
    }, {
        //returning: false,
        where: {
            id: 2
        }
    });
};

module.exports.minuspoint = async(req, res, next) => {
    //let id = req.session.passport.user;
    let likeCount = await db.user.findLikeCountUser(2);
    dbuser.update({
        like_count: likeCount - 1
    }, {
        //returning: false,
        where: {
            id: 2
        }
    });
};

module.exports.rating = async function(req, res, next) {
    console.log('Den day');
    // res.send('<h1>Thanh cong</h1>');
    let bidderId = req.params.winnerId;
    let sellerId = req.user.id;
    let vote = req.body.rating;
    let content = req.body.content;

    await db.feedback.create({
        sellerId: sellerId,
        bidderId: bidderId,
        vote: vote,
        content: content
    });

    let bidderInstance = await db.user.findByPk(bidderId);

    if (vote == 1) {
        await db.user.update({
            like_count: bidderInstance.like_count + 1
        }, {
            returning: false,
            where: { id: bidderId }
        });
    } else {
        await db.user.update({
            report_count: bidderInstance.report_count + 1
        }, {
            returning: false,
            where: { id: bidderId }
        });
    }

    console.log('rating xong');
    res.redirect('/bidders/mywinningproduct');
};
module.exports.feedbacks = async function(req, res, next) {
    if (auth.isBidder(req, res)) {
        console.log('Den day');
        let feedbacks = await db.feedback.findAllFeedbacks(req.user.id);

        feedbacks.forEach(f => {
            f.isLike = f.vote === 1 ? true : false;
            let d = new Date(`${f.createdAt}`);
            d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
            console.log(d);
            f.date_post = d.toLocaleString();
            console.log(f.date_post);
        });

        let info = await db.user.findByPk(req.user.id);

        info.rating =
            (info.like_count * 100) / (info.like_count + info.report_count);
        info.report_rate = 100 - info.rating;

        Cat = await db.category.categoriesAndChild();

        req.user.isloggedin = true;
        res.render('./web/bidder/myfeedback', {
            feedbacks: feedbacks,
            info: [info],
            user: [req.user],
            isBidder: req.user.role === 0,
            isSeller: req.user.role === 1,
            Cat: Cat
        });
    } else {
        res.redirect('/');
    }
};