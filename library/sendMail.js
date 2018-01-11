var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "testemailimaginaria@gmail.com",
        pass: ""
    }
});

var sendMail = function (email, token, req) {
    return new Promise(
        function (resolve, reject) {
            // console.log('req.headers: ', req.headers);
            var link = "http://" + req.headers.host + "/accounts/confirmation?token=" + token.token + "&email=" + email;
            var mailOptions = {
                from: "giorgio[ sg<testemailimaginaria@gmail.com>",
                to: email,
                subject: "Account verification - Test API",
                html: "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><title>Email form test</title></head><body>Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">click here</a><form id='verificationForm' method='get' action="+link+"></form><button type='submit' form='verificationForm' value='Submit'>Confirm</button></body></html>"
            };
            // console.log(mailOptions);
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                };
            });
        });
};

module.exports = sendMail;