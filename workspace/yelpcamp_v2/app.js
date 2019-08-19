var express = require("express");
var app = express();
var bodyParser = require("body-parser"); // req.params.xxx
var mongoose = require("mongoose");
var methodOverride = require("method-override"); // for EDIT, PUT, DELETE
var passport = require("passport"); // passport login
var LocalStrategy = require("passport-local"); // passport strategy

// require db models
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var initDB = require("./seeds");

// require routes
var indexRoutes = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");

// use
mongoose.connect("mongodb://localhost/yelp_camp_v2", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true})); // for using bodyParser
app.use(express.static("public")); // for css files
app.set("view engine", "ejs"); // for skipping ".ejs"
app.use(methodOverride("_method")); // for PUT
// passport configure
app.use(require('express-session')({ secret: 'a random key for sessionID', resave: true, saveUninitialized: true })); // for session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // user-defined authentication, User.authenticate() is from passport-local-mongoose
passport.serializeUser(User.serializeUser()); // user-defined serialization, User.serializeUser() is from passport-local-mongoose
passport.deserializeUser(User.deserializeUser()); // user-defined deserialization, User.deserializeUser() is from passport-local-mongoose

// init database
initDB();

// routes
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// listen
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    console.log("app started...");
})