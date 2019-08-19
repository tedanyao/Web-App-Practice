var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Campground = require("../models/campground");
var middleware = require("../middleware/index");
// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    console.log("what");
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
           console.log("no this page");
        }  else {
            console.log(camp);
            res.render("comment/new", {camp: camp});
        }
    })
})
// CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
    // here to get req.params.id, we should specify:
    // var router = express.Router({mergeParams: true})
    // so that we can get req.params from parent route
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log("cannot find id to add comment");
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log("cannot add comments");
                } else {
                    // add to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // add to campground
                    camp.comments.push(comment);
                    camp.save();
                    // redirect
                    res.redirect("/campgrounds/" + req.params.id);
                }
            })
        }
    })
});

// EDIT
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.isCommentOwner, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.render("comment/edit", {comment: comment, camp_id: req.params.id});
        }
    })
})
// UPDATE
router.put("/:comment_id", middleware.isLoggedIn, middleware.isCommentOwner, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})
// DELETE
router.delete("/:comment_id", middleware.isLoggedIn, middleware.isCommentOwner, function(req, res) {
    Comment.findOneAndDelete({_id: req.params.comment_id}, function(err, deletedComment) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            console.log("delete success")
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})


module.exports = router;