var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seed");


app.use(bodyParser.urlencoded({extended: true})); // for using bodyParser
app.use(express.static("public")); // for css files
app.set("view engine", "ejs"); // for skipping ".ejs"
mongoose.connect("mongodb://localhost/yelp_camp_v1", {useNewUrlParser: true});
app.use(methodOverride("_method")); // for PUT

// init database
Campground.find({}, function(err, item){
    if (err) {
        console.log("db error, clear db");
        seedDB();
    } else {
        if (item.length == 0) {
            console.log("initialize items");
            seedDB();
        } else {
            console.log("exist items");
        }
    }
})

app.get("/", function(req, res) {
    res.redirect("/camgrounds");
})
// INDEX
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    })
})
// NEW
app.get("/campgrounds/new", function(req, res) {
    res.render("campground/new");
})
// CREATE
app.post("/campgrounds", function(req, res) {
    Campground.create(req.body.camp, function(err) {
        if (err) {
            console.log("add operation error");
        } else {
            res.redirect("/campgrounds");
        }
    })
} )
// SHOW
app.get("/campgrounds/:id", function(req, res) {
    
    // Campground.findById(req.params.id, function(err, camp) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, camp){
        if (err) {
            console.log("invalid id");
        } else {
            res.render("campground/show", {camp: camp});
        }
    })
})
// DELETE
app.delete("/campgrounds/:id", function(req, res) {
    Campground.findOneAndDelete({_id: req.params.id}, function(err, item) {
        if (err) {
            console.log("delete error");
            res.redirect("/campgrounds");
        } else {
            console.log("delete success");
            res.redirect("/campgrounds");
        }
    })
})
// COMMENT
// NEW
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
           console.log("no this page");
        }  else {
            res.render("comment/new", {camp: camp});
        }
    })
})
// CREATE
app.post("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log("cannot find id to add comment");
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log("cannot add comments");
                } else {
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/campgrounds/" + req.params.id);
                }
            })
        }
    })
})

// listen
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    console.log("app started...");
})