var mongoose = require("mongoose")

// define schema
var schema = mongoose.Schema({
    author: String,
    text: String,
});

module.exports = mongoose.model("Comment", schema);