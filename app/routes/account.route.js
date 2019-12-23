const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account.controller');
const mailOTP = require('../controllers/mailOTP.controller');

router.get('/',accountController.account);

router.post(
    '/edit-profile',
    accountController.ValidateEdit,
    accountController.edit);

router.get('/change-email',accountController.ShowPageChangeEmail);

router.post(
    '/change-email',
    accountController.changeEmail,
    accountController.ShowMailOTP,
    mailOTP.MailOTP);
router.post(
    '/change-email/mailotp',
    mailOTP.Validate, 
    accountController.ActivateEmail
);

router.get('/change-password',accountController.ShowPageChangePassword);
router.post(
    '/change-password',
    accountController.ValidateCurrentPassword,
    accountController.PostChangePassword);


module.exports = router;