var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");
// INDEX
router.get("/", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campground/index", {campgrounds: campgrounds});
        }
    })
})
// NEW
router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campground/new");
})
// CREATE

router.post("/", middleware.isLoggedIn, function(req, res) {
    req.body.camp.author = {
        id: req.user._id,
        username: req.user.username
    }
    Campground.create(req.body.camp, function(err) {
        if (err) {
            console.log("add operation error");
        } else {
            res.redirect("/campgrounds");
        }
    })
} )
// SHOW
router.get("/:id", function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, camp){
        if (err) {
            console.log("invalid id");
            res.send("Wrong page");
        } else {
            console.log("found item")
            console.log(camp); // see if it is NULL?
            res.render("campground/show", {camp: camp});
        }
    })
})

// EDIT
router.get("/:id/edit", middleware.isLoggedIn, middleware.isCampOwner, function(req, res) {
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campground/edit", {camp: camp})
        }
    })
})

// UPDATE
router.put("/:id", middleware.isLoggedIn, middleware.isCampOwner, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, camp) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})
// DESTROY
router.delete("/:id", middleware.isLoggedIn, middleware.isCampOwner, function(req, res) {
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


module.exports = router;