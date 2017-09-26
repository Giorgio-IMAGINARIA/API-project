var express = require('express');
var router = express.Router();

function count(obj) { return Object.keys(obj).length; }

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/', function (req, res, next) {
    if (count(req.body) === 2) {
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