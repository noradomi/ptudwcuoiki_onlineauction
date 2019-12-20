const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account.controller');

router.get('/',accountController.account);

router.post(
    '/edit-profile',
    accountController.ValidateEdit,
    accountController.edit);

router.get('/change-email',(req,res)=>{
    res.render('web/change-email');
});

router.get('/change-password',accountController.ShowPageChangePassword);
router.post(
    '/change-password',
    accountController.ValidateCurrentPassword,
    accountController.PostChangePassword);


module.exports = router;