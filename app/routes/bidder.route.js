const express = require('express');
const router = express.Router();

const bidderController = require('../controllers/bidder.controller');

//  Thêm/Xóa 1 sản phẩm -> Danh sách WatchList của user
router.post('/watchlist/:proid', bidderController.actWatchList);

router.post('/bid/:proid', bidderController.bid);

module.exports = router;
