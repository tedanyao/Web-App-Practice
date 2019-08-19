var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewares = {};

middlewares.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

middlewares.isCampOwner = function(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, camp) {
            if (err) {
                res.redirect("back");
            } else {
                console.log(typeof(camp.author.id.toString()));
                console.log(typeof(req.user._id.toString()));
                if (camp.author.id.toString() == req.user._id.toString()) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
    }
}

middlewares.isCommentOwner = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err) {
                res.redirect("back");
            } else {
                console.log(typeof(comment.author.id.toString()));
                console.log(typeof(req.user._id.toString()));
                if (comment.author.id.toString() == req.user._id.toString()) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
    }
}

module.exports = middlewares;