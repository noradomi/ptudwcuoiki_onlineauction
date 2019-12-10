const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/auth/login');
}

router.get('/login', authController.login);

router.post('/login', authController.validateLogin, authController.postLogin);

router.get('/register', authController.register);

router.post(
    '/register',
    authController.validateRegister,
    authController.postRegister
);

router.get('/dashboard', isLoggedIn, authController.dashboard);
router.get('/productdetail', isLoggedIn, authController.productdetail);

module.exports = router;