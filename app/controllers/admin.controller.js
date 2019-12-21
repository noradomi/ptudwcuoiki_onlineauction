const models = require('../models');

module.exports.dasboard = function(req, res) {
    res.render('web/admin-dashboard', {
        layout: 'admin-main.hbs',
    });
};