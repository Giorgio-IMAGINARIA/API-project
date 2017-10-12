var nodemailer = require('nodemailer');
// var fs = require('fs');
var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "testemailimaginaria@gmail.com",
        pass: "corbusierA1london2014A1"
    }
});

var sendMail = function (email) {
    console.log('email: ', email);
    var link = "https://www.google.it/";
    var mailOptions = {
        from: "giorgio[ sg<testemailimaginaria@gmail.com>",
        to: email,
        subject: "Send Email Using Node.js",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
    });
};

module.exports = sendMail;