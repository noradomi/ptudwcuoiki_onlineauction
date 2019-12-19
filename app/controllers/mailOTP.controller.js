const nodemailer = require('nodemailer');
var randomNumber;

module.exports.MailOTP = async (req, res, next) => {
	var email = req.body.email;

	var otp = Math.floor(1000 + Math.random() * 9000);
	randomNumber = otp;

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

}

module.exports.Validate = (req,res,next) =>{
    if(parseInt(req.body.otp) == randomNumber ){
        res.render('./web/register', {
            layout: false,
            registerSuccess: true,
        });
        console.log("OTP passed");
    }else{
        res.render('./web/register', {
            layout: false,
            showMailOTP:true,
            OTPFailed: true,
        });
        console.log('OTP failed');

module.exports.Validate = (req, res, next) => {
	console.log(req.body.otp);
	if (parseInt(req.body.otp) == randomNumber) {
		res.render('./web/register', {
			layout: false,
			registerSuccess: true
		});
		console.log('OTP passed');
	} else {
		res.render('./web/register', {
			layout: false,
			showMailOTP: true,
			OTPFailed: true
		});
		console.log('OTP failed');
	}
};
