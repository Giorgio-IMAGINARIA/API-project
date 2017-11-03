var express = require('express');
var router = express.Router();
const { check } = require('express-validator/check');

// Require controller modules
var accounts_controller = require('../controllers/accountsController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
// Register a user
router.post('/register', [
    check('email')
        .exists()
        .isLength({ min: 1 })
        .isEmail()
        .withMessage('must be an email')
        .trim()
        .normalizeEmail(),
    check('password')
        .exists()
        .isLength({ min: 1 })
        .withMessage('password empty'),
    check('callbackurl')
        .exists()
        .isLength({ min: 1 })
        .withMessage('callbackurl empty'),
    check('sn')
        .exists()
        .withMessage('sn property not existing'),
    check('givenName')
        .exists()
        .withMessage('givenName property not existing')
], accounts_controller.user_register);
// Confirm a sent email
router.get('/confirmation', 
// [
//     check('email')
//         .exists()
//         .isLength({ min: 1 })
//         .isEmail()
//         .withMessage('must be an email')
//         .trim()
//         .normalizeEmail(),
//     check('password')
//         .exists()
//         .isLength({ min: 1 })
//         .withMessage('password empty'),
//     check('callbackurl')
//         .exists()
//         .isLength({ min: 1 })
//         .withMessage('callbackurl empty'),
//     check('sn')
//         .exists()
//         .withMessage('sn property not existing'),
//     check('givenName')
//         .exists()
//         .withMessage('givenName property not existing')
// ],
accounts_controller.user_confirm);

module.exports = router;