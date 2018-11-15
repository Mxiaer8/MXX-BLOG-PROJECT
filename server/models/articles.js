var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var articlesSchema = new Schema({
    "articlesName" : String,
    "articlesTime": String,
    "articlesText":String,
    "articlesRead": Number,
    "articlesPoint": Number,
});

module.exports = mongoose.model('Article',  articlesSchema)