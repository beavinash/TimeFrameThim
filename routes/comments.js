var express = require("express");
var router  = express.Router({mergeParams: true}); // merge is for getting and using ID of themes and comments. Without this it will be showing error. 
var Theme = require("../models/theme")
var Comment = require("../models/comment")

// ====================
// COMMENTS ROUTES
// ====================

// Comment New
router.get("/new", isLoggedIn,function(req, res){
    // find campground by id
    Theme.findById(req.params.id, function(err, theme){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {theme: theme});
        }
    })
});

// Comment post i.e. create
router.post("/", isLoggedIn,function(req, res){
   //lookup theme using ID
   Theme.findById(req.params.id, function(err, theme){
       if(err){
           console.log(err);
           res.redirect("/themes");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               // add username and id to comment
               // Save Theme
               comment.author.id = req.user._id
               comment.author.username = req.user.username
               comment.save()
               theme.comments.push(comment);
               theme.save();
               res.redirect('/themes/' + theme._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to theme
   //redirect theme show page
});

// Checking condition if user logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router