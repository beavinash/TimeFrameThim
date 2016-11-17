var express = require("express");
var router  = express.Router();
var User = require("../models/user")
var passport = require("passport")
// ====================
// AUTH ROUTES
// ====================

// Show registration form
router.get("/register", function(req, res) {
    res.render("register")
})

// Sign Up Logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err)
            return res.render("register")
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/themes")
            })
        }
    })
})

// Show Login Form
router.get("/login", function(req, res) {
    res.render("login")
})

// Login Authentication
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/themes",
        failureRedirect: "/login"
    }), function(req, res){
});

// Logout Route
router.get("/logout", function(req, res) {
    req.logout()
    res.redirect("/themes")
})

// Checking condition if user logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router