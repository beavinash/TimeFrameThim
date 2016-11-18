var express = require("express");
var router  = express.Router({mergeParams: true}); // merge is for getting and using ID of themes and comments. Without this it will be showing error. 
var Theme = require("../models/theme")
var Comment = require("../models/comment")
var middleware = require("../middleware")


// ====================
// COMMENTS ROUTES
// ====================

// Comment New
router.get("/new", middleware.isLoggedIn,function(req, res){
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
router.post("/", middleware.isLoggedIn,function(req, res){
   //lookup theme using ID
   Theme.findById(req.params.id, function(err, theme){
       if(err){
           console.log(err);
           res.redirect("/themes");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               // add username and id to comment
               // Save Theme
               comment.author.id = req.user._id
               comment.author.username = req.user.username
               comment.save()
               theme.comments.push(comment);
               theme.save();
               req.flash("success", "Successfully added comment");
               res.redirect('/themes/' + theme._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to theme
   //redirect theme show page
});

// Comment Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.render("comments/edit", {theme_id: req.params.id, comment: foundComment})
        }
    })
    
})

// Comment Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.redirect("/themes/" + req.params.id)
        }
    })
})

// Comment Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    // Find by id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back")
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/themes/" + req.params.id)
        }
    })
})



module.exports = router