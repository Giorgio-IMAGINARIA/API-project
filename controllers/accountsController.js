// var Author = require('../models/author');
var User = require('../models/accountModel');
var sendMail = require('../library/sendMail.js');
var User = require('../models/accountModel');
var Token = require('../models/tokenModel');
const crypto = require('crypto');

function count(obj) { return Object.keys(obj).length; }



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Register a user
exports.user_register = function (req, res) {



















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







        User.findOne({ email: req.body.email }, function (err, user) {

            // Make sure user doesn't already exist
            // if (user) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
            // Create and save the user
            user = new User({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password
            });

            var hash = crypto.createHash('sha256').digest('hex');

            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                var token = new Token({ _userId: user._id, token: hash });
                token.save(function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }

                    // Send the email
                    sendMail(req.body.email);
                    res.status(200).send({
                        message: 'Accepted auth POST request',
                        objectProcessed: req.body
                    });
                });
            });



        
        });
    } else {
        res.status(400).send({ message: 'Malformed auth POST request' });
    };
}

// Display detail page for a specific Author
// exports.author_detail = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
// };

// Display Author create form on GET
// exports.author_create_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author create GET');
// };

// Handle Author create on POST
// exports.author_create_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author create POST');
// };

// Display Author delete form on GET
// exports.author_delete_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author delete GET');
// };

// Handle Author delete on POST
// exports.author_delete_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author delete POST');
// };

// Display Author update form on GET
// exports.author_update_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author update GET');
// };

// Handle Author update on POST
// exports.author_update_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author update POST');
// };