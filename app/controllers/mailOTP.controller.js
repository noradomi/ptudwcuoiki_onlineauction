const nodemailer = require('nodemailer');
var randomNumber;

module.exports.MailOTP = async (req,res,next) => {
    var email = req.body.email;
    
    var otp = Math.floor(1000 + Math.random() * 9000);
    randomNumber = otp;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'onlineauction.hcmus@gmail.com',
            pass: '12345678a@'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
          }
    });

    let info = await transporter.sendMail({
        from: '"Online Auction" <onlineauction@gmail.com>',
        to: `${email}`,
        subject: "Email OTP",
        text: `This is your OTP: ${randomNumber}`,
        html: `<b>Enter this OTP: ${randomNumber} to activate your Online Auction account</b>`
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

    }
};
