var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    "userName":String,
    "userPwd":String
});

module.exports = mongoose.model('User',  usersSchema)