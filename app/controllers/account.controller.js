const model = require('../models');
const bCrypt = require('bcryptjs');
const passport = require('passport');

var User = model.user;
module.exports.account = (req, res) => {
    if (req.isAuthenticated()) {
        model.user.findOne({
                where: {
                    id: req.session.passport.user,
                }
            })
            .then(dbUser => {
                let user = [{
                    userInfo: dbUser.dataValues,
                    id: req.session.passport.user,
                    isloggedin: true,
                }];
                res.render('web/account', {
                    user: user,
                });
            });
    } else {
        res.redirect('auth/login');
    }
}

module.exports.ValidateEdit = (req, res, next) => {

    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('firstname', 'Firstname is required').notEmpty();
    req.checkBody('lastname', 'Lastname is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    //check for errors
    var errors = req.validationErrors();


    if (errors) {

        model.user.findOne({
                where: {
                    id: req.session.passport.user,
                }
            })
            .then(dbUser => {
                var messages = [];
                errors.forEach(function(error) {
                    messages.push(error.msg);
                });
                let user = [{
                    userInfo: dbUser.dataValues,
                    id: req.session.passport.user,
                    isloggedin: true,
                }];
                res.render('web/account', {
                    messages: messages,
                    hasErrors: messages.length > 0,
                    user: user,
                });
            });
    } else {
        console.log('Qua buoc validation.');
        next();
    }
}

module.exports.edit = (req, res) => {

    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    var user = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        id: req.session.passport.user,
    }

    User.EditProfile(user).then(function(result) {
        if (result[0] == 1) {
            model.user.findOne({
                where: {
                    id: req.session.passport.user,
                }
            }).then(dbUser => {
                let user = [{
                    userInfo: dbUser.dataValues,
                    id: req.session.passport.user,
                    isloggedin: true,
                }];
                res.render('web/account', {
                    editProfileSuccess: true,
                    user: user,
                });
            });
        } else {
            model.user.findOne({
                where: {
                    id: req.session.passport.user,
                }
            }).then(dbUser => {
                let user = [{
                    userInfo: dbUser.dataValues,
                    id: req.session.passport.user,
                    isloggedin: true,
                }];
                res.render('web/account', {
                    editProfileFailed: true,
                    user: user,
                });
            });
        }
    });
}

module.exports.ShowPageChangePassword = (req, res) => {

    var messages = req.flash('errors');

    model.user.findOne({
        where: {
            id: req.session.passport.user,
        }
    }).then(dbUser => {
        let user = [{
            userInfo: dbUser.dataValues,
            id: req.session.passport.user,
            isloggedin: true,
        }];
        res.render('web/change-password', {
            messages: messages,
            hasErrors: messages.length > 0,
            user: user,
        });
    });
}

module.exports.ValidateCurrentPassword = passport.authenticate('local-signin', {
    failureFlash: true,
    failureRedirect: '/account/change-password',
});

module.exports.PostChangePassword = (req, res) => {
    req.checkBody(
        'newPass',
        'Confirm password do not match. Try again!'
    ).equals(req.body.confirm_password);

    var errors = req.validationErrors();

    if (errors) {
        //confirm password not match
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        model.user.findOne({
            where: {
                id: req.session.passport.user,
            }
        }).then(dbUser => {
            let user = [{
                userInfo: dbUser.dataValues,
                id: req.session.passport.user,
                isloggedin: true,
            }];
            res.render('web/change-password', {
                messages: messages,
                hasErrors: true,
                user: user,
            });
        });
    } else {
        var newPass = req.body.newPass;
        var hashPass = bCrypt.hashSync(newPass, bCrypt.genSaltSync(8), null);
        var user = {
            id: req.session.passport.user,
            password: hashPass,
        }
        model.user.ChangePassword(user).then(function(result) {
            if (result[0] == 1) {
                model.user.findOne({
                    where: {
                        id: req.session.passport.user,
                    }
                }).then(dbUser => {
                    let user = [{
                        userInfo: dbUser.dataValues,
                        id: req.session.passport.user,
                        isloggedin: true,
                    }];
                    res.render('web/change-password', {
                        changePasswordSuccess: true,
                        user: user,
                    });
                });
            } else {
                model.user.findOne({
                    where: {
                        id: req.session.passport.user,
                    }
                }).then(dbUser => {
                    let user = [{
                        userInfo: dbUser.dataValues,
                        id: req.session.passport.user,
                        isloggedin: true,
                    }];
                    res.render('web/account', {
                        changePasswordSuccess: true,
                        user: user,
                    });
                });
            }
        })
    }
}

module.exports.ShowPageChangeEmail = (req, res) => {
    model.user.findOne({
        where: {
            id: req.session.passport.user,
        }
    }).then(dbUser => {
        let user = [{
            userInfo: dbUser.dataValues,
            id: req.session.passport.user,
            isloggedin: true,
        }];
        res.render('web/change-email', {
            user: user,
        });
    });
}

module.exports.changeEmail = (req, res, next) => {
    var user = {
        email: req.body.email,
        id: req.session.passport.user,
    }

    model.user.ChangeEmail(user).then(function(result) {
        if (result[0] == 1) {
            next();
        } else {
            res.render('web/change-email');
        }
    });
}

module.exports.ShowMailOTP = (req, res, next) => {
    res.render('web/change-email', {
        showMailOTP: true,
        email: req.body.email,
    });
    next();
}

module.exports.ActivateEmail = (req, res, next) => {
    var email = req.body.email;
    model.user.Activate(email).then(function(result) {
        if (result[0] == 1) {
            model.user.findOne({
                where: {
                    id: req.session.passport.user,
                }
            }).then(dbUser => {
                let user = [{
                    userInfo: dbUser.dataValues,
                    id: req.session.passport.user,
                    isloggedin: true,
                }];
                res.render('web/change-email', {
                    user: user,
                    changeEmailSuccess: true,
                });
            });
        } else {
            model.user.findOne({
                where: {
                    id: req.session.passport.user,
                }
            }).then(dbUser => {
                let user = [{
                    userInfo: dbUser.dataValues,
                    id: req.session.passport.user,
                    isloggedin: true,
                }];
                res.render('web/change-email', {
                    user: user,
                    changeEmailFailed: true,
                });
            });
        }
    })
}

module.exports.watchlist = async(req, res, next) => {
    // var user = {
    //     email: req.body.email,
    //     id: req.session.passport.user,
    // }
    let id = req.session.passport.user;
    let WatchList = await model.watchlist.findAllProduct(id);
    res.render('./web/watchlist', {
        WatchList: WatchList,
        TITLE: "LOVE LIST",
    });
};

module.exports.mybid = async(req, res, next) => {
    let id = req.session.passport.user;
    let WatchList = await model.watchlist.findAllBidProduct(id);
    res.render('./web/watchlist', {
        WatchList: WatchList,
        TITLE: "MY BID",
    });
};
module.exports.mywinpro = async(req, res, next) => {
    let id = req.session.passport.user;
    let WatchList = await model.watchlist.findAllWinPro(id);
    res.render('./web/watchlist', {
        WatchList: WatchList,
        TITLE: "MY WINNING PRODUCT ",
    });
};

module.exports.addpoint = async(req, res, next) => {
    //let id = req.session.passport.user;
    let likeCount = await model.user.findLikeCountUser(2);
    model.user.update({
        like_count: likeCount + 1,
    }, {
        //returning: false,
        where: {
            id: 2,
        }
    });
};

module.exports.minuspoint = async(req, res, next) => {
    //let id = req.session.passport.user;
    let likeCount = await model.user.findLikeCountUser(2);
    model.user.update({
        like_count: likeCount - 1,
    }, {
        //returning: false,
        where: {
            id: 2,
        }
    });
};