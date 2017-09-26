var express = require('express');
var router = express.Router();

function count(obj) { return Object.keys(obj).length; }

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/', function (req, res, next) {
    if (count(req.body)===2){
        console.log('correct number of properties');
        console.log('the number of keys is: ', count(req.body));
        console.log('req.body: ', req.body);
        res.json({ response: true });
    } else {
        console.log('the number of properties is not correct');
        console.log('the number of keys is: ', count(req.body));
        console.log('req.body: ', req.body);
        res.json({ response: false });
    };
});

module.exports = router;