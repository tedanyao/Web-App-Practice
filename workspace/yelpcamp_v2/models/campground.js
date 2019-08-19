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
      }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String // just used to accelerate search
    }
});
// create model
module.exports = mongoose.model("Campground", schema);