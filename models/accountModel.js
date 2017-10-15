var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    surname: String,
    email: { type: String, lowercase: true, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);