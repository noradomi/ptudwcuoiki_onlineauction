const model = require('../models');
const bCrypt = require('bcryptjs');
const passport = require('passport');

var User = model.user;
module.exports.account = (req,res) => {
    if(req.isAuthenticated()){
        model.user.findOne({
            where: {
                id: req.session.passport.user,
            }
        })
        .then(dbUser => {
            let user = [
            {
                userInfo: dbUser.dataValues,
                id: req.session.passport.user,
                isloggedin: true,
            }
            ];
            res.render('web/account',{  
                user: user,
            });
        });
    }
    else{
        res.redirect('auth/login');
    }
}

module.exports.ValidateEdit = (req,res,next) =>{

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
            let user = [
            {
                userInfo: dbUser.dataValues,
                id: req.session.passport.user,
                isloggedin: true,
            }
            ];
            res.render('web/account',{
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

module.exports.edit = (req,res) => {

    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    var user = 
        {
            username: username,
            firstname: firstname,
            lastname: lastname,
            id: req.session.passport.user,
        }

    User.EditProfile(user).then(function(result){
        if(result[0] == 1){
            model.user.findOne({
                where: {
                    id: req.session.passport.user,
                }
            }).then(dbUser => {
                let user = [
                {
                    userInfo: dbUser.dataValues,
                    id: req.session.passport.user,
                    isloggedin: true,
                }
                ];
                res.render('web/account',{
                    editProfileSuccess: true,
                    user: user,
                });
            });
        }else{
            model.user.findOne({
                where: {
                    id: req.session.passport.user,
                }
            }).then(dbUser => {
                let user = [
                {
                    userInfo: dbUser.dataValues,
                    id: req.session.passport.user,
                    isloggedin: true,
                }
                ];
                res.render('web/account',{
                    editProfileFailed: true,
                    user: user,
                });
            });
        }
    });
}

module.exports.ShowPageChangePassword = (req,res) => {

    var messages = req.flash('errors');

    model.user.findOne({
        where: {
            id: req.session.passport.user,
        }
    }).then(dbUser => {
        let user = [
        {
            userInfo: dbUser.dataValues,
            id: req.session.passport.user,
            isloggedin: true,
        }
        ];
        res.render('web/change-password',{
            messages:messages,
            hasErrors: messages.length > 0,
            user: user,
        });
    });
}

module.exports.ValidateCurrentPassword = passport.authenticate('local-signin',{
    failureFlash:true,
    failureRedirect:'/account/change-password',
});

module.exports.PostChangePassword = (req,res) =>
{
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
            let user = [
            {
                userInfo: dbUser.dataValues,
                id: req.session.passport.user,
                isloggedin: true,
            }
            ];
            res.render('web/change-password',{
                messages: messages,
                hasErrors: true,
                user: user,
            });
        });     
    } else {
        var newPass =  req.body.newPass;
        var hashPass = bCrypt.hashSync(newPass,bCrypt.genSaltSync(8),null);
        var user = {
            id: req.session.passport.user,
            password: hashPass,
        }
        model.user.ChangePassword(user).then(function(result){
            if(result[0] == 1){
                model.user.findOne({
                    where: {
                        id: req.session.passport.user,
                    }
                }).then(dbUser => {
                    let user = [
                    {
                        userInfo: dbUser.dataValues,
                        id: req.session.passport.user,
                        isloggedin: true,
                    }
                    ];
                    res.render('web/change-password',{
                        changePasswordSuccess: true,
                        user: user,
                    });
                });
            }else{
                model.user.findOne({
                    where: {
                        id: req.session.passport.user,
                    }
                }).then(dbUser => {
                    let user = [
                    {
                        userInfo: dbUser.dataValues,
                        id: req.session.passport.user,
                        isloggedin: true,
                    }
                    ];
                    res.render('web/account',{
                        changePasswordSuccess: true,
                        user: user,
                    });
                });
            }
        })
    }
}