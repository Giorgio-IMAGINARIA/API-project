var express = require('express');
var router = express.Router();

// Require controller modules
var accounts_controller = require('../controllers/accountsController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
// Register a user
router.post('/register', accounts_controller.user_register);

module.exports = router;