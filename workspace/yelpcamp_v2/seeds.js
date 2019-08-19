var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user")

// init
var userData = [
    {
        username: "a",
        password: "a"
    },
    {
        username: "User1",
        password: "1111"
    }
    ];
console.log(userData[0].username);
var data = [
    {
        name: "flower", 
        image: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500", 
        description: "rose",
        comments: []
    },
    {
        name: "Love", 
        image: "https://p4k4m7q9.stackpathcdn.com/wp-content/uploads/2017/02/I-Love-You-Images-flowers.jpg", 
        description: "I love you",
        comments: []
    }
    ];

// init database
function initDB() {
    Campground.find({}, function(err, item){
        if (err) {
            console.log("db error, clear db");
            seedDB();
        } else {
            if (item.length == 0) {
                console.log("initialize items");
                seedDB();
            } else {
                seedDB();
                console.log("exist items");
            }
        }
    })
}

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
                    User.deleteMany({}, function(err) {
                        if (err) {console.log(err);}
                        data.forEach(function(camp, index) {
                            console.log(userData[index].username);
                            var newUser = new User({username: userData[index].username})
                            User.register(newUser, userData[index].password, function(err, newUser) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(newUser)
                                    console.log(camp)
                                    camp.author = {id: newUser._id, username: newUser.username};
                                    Campground.create(camp, function(err) {
                                    if (err) {
                                            console.log(err);
                                        } else {
                                                console.log("add init "+ camp);
                                        }
                                    })
                                }
                            });
                        })
                    })
                    
                }
            })
        }
    })
}
module.exports = initDB;