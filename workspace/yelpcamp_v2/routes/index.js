var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res) {
    res.render("landing")
})

// AUTHENTICATION
router.get("/register", function(req, res) {
    res.render("register");
})

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username}); // from mongoose
    // from passport-local-mongoose
    // checks if username is unique, and store hashed version of password
    User.register(newUser, req.body.password, function(err, newUser) {
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            // log in and create sessions
            passport.authenticate("local")(req, res, function() {
                res.redirect("/campgrounds");
            })
        }
    })
})
// get
router.get("/login", function(req, res) {
    res.render("login");
})
// post
router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "login"}));
// logout
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("login");
}

module.exports = router;