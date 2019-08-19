var mongoose = require("mongoose")

// define schema

var schema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }]
});
// create model
module.exports = mongoose.model("Campground", schema);