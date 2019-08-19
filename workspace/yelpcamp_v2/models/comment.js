var mongoose = require("mongoose")

// define schema
var schema = mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    text: String,
});

module.exports = mongoose.model("Comment", schema);