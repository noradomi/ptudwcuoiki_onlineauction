const db = require('../models');
const auth = require('../middleware/auth.middleware');
const nodemailer = require('nodemailer');

var User = db.user;
var Product = db.product;
var BidDetails = db.bid_details;

module.exports.actWatchList = async (req, res, next) => {
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

module.exports.bid = async (req, res, next) => {

	const userId = req.user.id;

	const proId = req.params.proid;

	const bidPrice = req.body.bidPrice;
	
	let user = await User.findByPk(userId);
	let product = await Product.findByPk(proId);
	let seller = await User.findByPk(product.sellerId);

	var listbider = await BidDetails.GetAllBiderOfProduct(product.id);

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'onlineauction.hcmus@gmail.com',
			pass: '12345678a@'
		},
		tls: {
			// do not fail on invalid certs
			rejectUnauthorized: false
		}
	});

	// Lưu thông tin đấu giá vào bảng bid_details
	db.bid_details.create({
		time: new Date(),
		price: bidPrice,
		productId: proId,
		userId: userId
	});

	// Kiểm tra sản phẩm có tự động cộng thêm thời gian khi có đấu giá 5 phút cuối không ?
	console.log('>>>>>>>>>>>> Kiểm tra bonus time');
	db.product.bonusTimeProduct(proId);
	// Cập nhật giá hiện tại của product
	db.product.update(
		{
			curr_price: bidPrice
		},
		{
			returning: false,
			where: { id: proId }
		}
	);

	// Cập nhật thông tin người thắng hiện tại
	db.product.update(
		{
			winnerId: userId
		},
		{
			returning: false,
			where: { id: proId }
		}
	);

	// db.watchlist.actWatchList(userId, proId);
	console.log('ĐÃ LƯU : Bid cho product ' + proId + ' boi bidder ' + userId);
	res.redirect(`/product/productdetail/7`);

	/*Mail system - Gui mail cho cac ben lien quan khi bid thanh cong */
	
	//Gui mail cho chinh nguoi bid

	User.findOne({
        where:{
            id: req.user.id,
        } 
    }).then(function(user){
        if(user)
        {
			var bider_email = user.email;
			transporter.sendMail({
				from: '"Online Auction" <onlineauction@gmail.com>',
				to: `${bider_email}`,
				subject: "Bid confirmation",
				text: `You are now in the race for ${product.product_name} `,
				html: `You have bid product <b> ${product.product_name}</b> with price <b> ${bidPrice} </b> successfully! `
			  });
        }
        else
        {
            console.log('Bider.controller >>>>>>>>>>> Gui mail cho nguoi dau gia that bai');
        }
    });
	
	// Gui mail thong bao cho seller
	var seller_email = seller.email;
	console.log(seller_email);

	transporter.sendMail({
		from: '"Online Auction" <onlineauction@gmail.com>',
		to: `${seller_email}`,
		subject: "New bid for your product",
		text: `New bid for ${product.product_name} `,
		html: `Your product: <b> ${product.product_name}</b> just have a new bid with price <b> ${bidPrice}. </b> Check out now ! `
	  });
	
	//Gui mail cho cac bider khac
	var arraybidermail = []; //All other bider

	listbider.forEach(l =>{
		if(l !== user.email){
			arraybidermail.push(l.email);
		}
	});

	transporter.sendMail({
		from: '"Online Auction" <onlineauction@gmail.com>',
		to: `${listbider}`,
		subject: "New bid for your product",
		text: `New bid for ${arraybidermail.join(', ')} `,
		html: `Your product: <b> ${product.product_name}</b> just have a new bid with price <b> ${bidPrice}. </b> Check out now ! `
	  });

	
	
};


module.exports.watchlist = async (req, res, next) => {
	// var user = {
	//     email: req.body.email,
	//     id: req.session.passport.user,
	// }
	let id = req.session.passport.user;
	let WatchList = await db.watchlist.findAllProduct(id);
	res.render('./web/watchlist', {
		WatchList: WatchList,
		TITLE: 'LOVE LIST'
	});
};

module.exports.mybid = async (req, res, next) => {
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
module.exports.mywinpro = async (req, res, next) => {
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

module.exports.addpoint = async (req, res, next) => {
	//let id = req.session.passport.user;
	let likeCount = await db.user.findLikeCountUser(2);
	db.user.update(
		{
			like_count: likeCount + 1
		},
		{
			//returning: false,
			where: {
				id: 2
			}
		}
	);
};

module.exports.minuspoint = async (req, res, next) => {
	//let id = req.session.passport.user;
	let likeCount = await db.user.findLikeCountUser(2);
	dbuser.update(
		{
			like_count: likeCount - 1
		},
		{
			//returning: false,
			where: {
				id: 2
			}
		}
	);
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
		await db.user.update(
			{
				like_count: bidderInstance.like_count + 1
			},
			{
				returning: false,
				where: { id: bidderId }
			}
		);
	} else {
		await db.user.update(
			{
				report_count: bidderInstance.report_count + 1
			},
			{
				returning: false,
				where: { id: bidderId }
			}
		);
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
