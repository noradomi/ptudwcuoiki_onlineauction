const models = require('../models');

module.exports.productname = async(req, res) => {
    let ProT = await models.product_type.findAllProT();
    res.render('web/sellerproduct', {
        ProT: ProT,
    });
};

module.exports.add = async(req, res, next) => {

    const productname = req.body.productname;
    const product_typeID = req.body.product_typeID;
    const product_price = req.body.product_price;
    const product_stepcost = req.body.product_stepcost;
    const product_buynowprice = req.body.product_buynowprice;
    //const product_startdate = req.body.product_startdate;
    //const product_enddate = req.body.product_enddate;
    const product_description = req.body.product_description;
    models.product.create({
        start_date: new Date(),
        expriry_date: new Date(),
        product_name: productname,
        initial_price: product_price,
        description: product_description,
        imme_buy_price: product_buynowprice,
        step_cost: product_stepcost,
        auto_extend: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        productTypeId: product_typeID,
    });
    console.log('ĐÃ LƯU PRODUCT MOI ');
}