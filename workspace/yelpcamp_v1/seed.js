var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


// init
var data = [
    {name: "flower", image: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500", description: "rose"},
    {name: "flower", image: "https://images.pexels.com/photos/54620/rose-roses-blossom-bloom-54620.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500", description: "rose"},
    {name: "flower", image: "https://images.pexels.com/photos/244497/pexels-photo-244497.png?auto=compress&cs=tinysrgb&dpr=2&w=500", description: "rose"}
    ];
//
function seedDB() {
    Campground.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("db: campground removed")
            Comment.deleteMany({}, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("db: comment removed")
                    data.forEach(function(camp) {
                        Campground.create(camp, function(err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("add init "+ camp);
                            }
                        })
                    })
                }
            })
        }
    })
}
module.exports = seedDB;