var mongoose = require ("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var schema = mongoose.Schema({
    username: String,
    password: String,
});

schema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", schema);