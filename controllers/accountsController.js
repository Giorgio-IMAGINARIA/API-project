// var Author = require('../models/author');
var sendMail = require('../library/sendMail.js');
var User = require('../models/accountModel');
var Token = require('../models/tokenModel');
const crypto = require('crypto');
const { validationResult } = require('express-validator/check');

// Register a user
exports.user_register = function (req, res) {
    // console.log('req.body: ', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    };

    User.findOne({ email: req.body.email }, function (err, user) {
        // Make sure user doesn't already exist
        if (user) return res.status(400).send({ message: 'The email address you have entered is already associated with another account.' });
        // Create and save the user
        user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password
        });


        user.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            var token = new Token({ _userId: user._id, token: crypto.createHash('sha256').digest('hex') });
            // console.log('token: ', token);
            token.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }

                sendMail(req.body.email, token, req).then((response) => {
                    // console.log('response: ', response);
                    res.status(200).send({
                        message: 'A verification email has been sent to: ' + req.body.email
                    });
                }).catch((err) => {
                    res.status(500).send({
                        message: err.message
                    });
                });
            });
        });
    });
}

// Confirm a sent email
exports.user_confirm = function (req, res) {
    console.log('arrostont');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
    };
    console.log('req.query.token: ', req.query.token);
    console.log('req.query.email: ', req.query.email);





    Token.findOne({ token: req.query.token }, function (err, token) {



        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {


            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });

            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
            console.log('user: ', user);
 
            // Verify and save the user
            // user.isVerified = true;
            // user.save(function (err) {
            //     if (err) { return res.status(500).send({ msg: err.message }); }
            //     res.status(200).send("The account has been verified. Please log in.");
            // });


        });
    });





    res.status(200).send({
        message: 'Test confirmation'
    });
};























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