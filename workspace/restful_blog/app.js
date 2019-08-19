var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var expressSanitizer = require("express-sanitizer")
var methodOverride = require("method-override")
var Blog = require("./models/blog")

mongoose.connect("mongodb://localhost/blog", {useNewUrlParser: true}); // load or create database "blog"
app.use(bodyParser.urlencoded({extended: true})); // used by "req.body"
app.use(expressSanitizer()); // for security, for malicious <script>
app.use(methodOverride("_method")); // for PUT


app.get("/", function(req, res) {
    res.redirect("/blogs")
})
// INDEX
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err)
        } else {
            res.render("index.ejs", {blogs: blogs})
        }
    })
})
// NEW
app.get("/blogs/new", function(req, res) {
    res.render("new.ejs")
})
// CREATE
app.post("/blogs", function(req, res) {
    console.log(req.body)
    Blog.create(req.body.blog, function(err, newblog) {
        if (err) {
            console.log("error adding items")
        } else {
            console.log("new blog added")
            res.redirect("/blogs")
        }
    })
})
// SHOW
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundblog) {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.render("show.ejs", {foundblog: foundblog})
        }
    })
})
// EDIT
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, thisblog) {
        if (err) {
            res.redirect("/blogs/")
        } else {
            res.render("edit.ejs", {thisblog: thisblog})
        }
    })
})
// UPDATE
app.put("/blogs/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body) // clear potential <script> in text
    Blog.findOneAndUpdate({_id: req.params.id}, req.body.blog, function(err, blog) {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs/" + req.params.id)
        }
    })
})
// DELETE
app.delete("/blogs/:id", function(req, res) {
    Blog.findOneAndDelete({_id: req.params.id}, function(err, item) {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs")
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("app started...")
})