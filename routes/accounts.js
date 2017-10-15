var express = require('express');
var router = express.Router();
var sendMail = require('../library/sendMail.js');
var User = require('../models/accountModel');



function count(obj) { return Object.keys(obj).length; }



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/register', function (req, res, next) {

    // User.findOne({ email: req.body.email }, function (err, user) {
    //     console.log('err: ', err);
    //     console.log('user: ', user);
    // });



    console.log('req.body: ', req.body);











    if (
        typeof req.body === 'object' &&
        count(req.body) >= 2 &&
        'email' in req.body &&
        'password' in req.body &&
        'callbackurl' in req.body &&
        typeof req.body.email === 'string' &&
        typeof req.body.password === 'string' &&
        typeof req.body.callbackurl === 'string' &&
        validateEmail(req.body.email)
    ) {
        var user = new User();
        user.email = req.body.email;



        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });



        // sendMail(req.body.email);
        res.status(200).send({
            message: 'Accepted auth POST request',
            objectProcessed: req.body
        });

    } else {
        res.status(400).send({ message: 'Malformed auth POST request' });
    };
});

module.exports = router;