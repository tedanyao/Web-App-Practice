var mongoose = require("mongoose")

// define schema
var schema = mongoose.Schema({
    title: {type: String, default: "default_title"},
    image: {type: String, default: "default_image"},
    body: {type: String, default: "default_body"},
    // created: {type: Date, default: Date.now}
})
// apply to model
module.exports = mongoose.model("Blog", schema)