var express = require('express');
var router = express.Router();

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

















    if (typeof req.body === 'object' && count(req.body) === 2 && 'email' in req.body && 'password' in req.body && typeof req.body.email === 'string' && typeof req.body.password === 'string' && validateEmail(req.body.email)) {
        // console.log('correct number of properties');
        // console.log('the number of keys is: ', count(req.body));
        // console.log('req.body: ', req.body);
        // res.json({ response: true });
        res.status(200).send({
            message: 'Accepted auth POST request',
            objectProcessed: req.body
        });

    } else {
        // console.log('the number of properties is not correct');
        // console.log('the number of keys is: ', count(req.body));
        // console.log('req.body: ', req.body);
        // res.json({ response: false });
        res.status(400).send({ message: 'Malformed auth POST request' });
    };
});

module.exports = router;