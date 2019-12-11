const passport = require('passport');

module.exports.login = (req, res) => {
    // lấy các thông báo lỗi từ passport.js
    // Mặc định các thông báo lỗi trong file passport.js sẽ lưu mặc định trong flash có tên là error.
    var messages = req.flash('errors');

    // Để load page lần đầu không bị lỗi
    var dataForm = req.flash('dataForm')[0];

    // console.log('dataForm flash: ' + dataForm);

    res.render('./web/login', {
        layout: false,
        messages: messages,
        hasErrors: messages.length > 0,
        dataForm: dataForm
    });
};

module.exports.validateLogin = (req, res, next) => {
    // form values
    var username = req.body.username;
    var password = req.body.password;

    //kiểm tra các  form values
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    //check for errors
    var errors = req.validationErrors();

    dataForm = {
        username: username,
        password: password
    };

    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        // console.log(messages);
        res.render('./web/register', {
            layout: false,
            messages: messages,
            hasErrors: messages.length > 0,
            dataForm: dataForm
        });
    } else {
        console.log('Qua buoc validation.');
        next();
    }
};

module.exports.postLogin = passport.authenticate('local-signin', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/auth/login'
});

module.exports.register = (req, res) => {
    // lấy các thông báo lỗi từ passport.js
    // Mặc định các thông báo lỗi trong file passport.js sẽ lưu mặc định trong flash có tên là error.
    var messages = req.flash('errors');

    // Để load page lần đầu không bị lỗi
    var dataForm = req.flash('dataForm')[0];

    console.log('dataForm flash: ' + dataForm);

    res.render('./web/register', {
        layout: false,
        messages: messages,
        hasErrors: messages.length > 0,
        dataForm: dataForm
    });
};

module.exports.validateRegister = (req, res, next) => {
    // form values
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var address = req.body.address;

    console.log('address = ' + address);

    //kiểm tra các  form values
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('firstname', 'Firstname is required').notEmpty();
    req.checkBody('lastname', 'Lastname is required').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody(
        'password',
        'Password must have minimum eight characters, at least one letter and one number.'
    ).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
    req.checkBody(
        'password',
        'Confirm password do not match. Try again!'
    ).equals(req.body.confirm_password);
    //check for errors
    var errors = req.validationErrors();

    dataForm = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        address: address
    };

    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        // console.log(messages);
        res.render('./web/register', {
            layout: false,
            messages: messages,
            hasErrors: messages.length > 0,
            dataForm: dataForm
        });
    } else {
        console.log('Qua buoc validation.');
        next();
    }
};

module.exports.postRegister = passport.authenticate('local-register', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/register',
    failureFlash: true
});

// FACEBOOK
module.exports.authfb = passport.authenticate('facebook');
module.exports.authfbcb = passport.authenticate('facebook', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/auth/login'
});

module.exports.dashboard = function(req, res) {
    res.render('./web/dashboard');
};
module.exports.productdetail = function(req, res) {
    res.render('./web/productdetail');
};
module.exports.product = function(req, res) {
    res.render('./web/product')
};