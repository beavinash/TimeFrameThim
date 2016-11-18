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

// Comment Edit Route
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.render("comments/edit", {theme_id: req.params.id, comment: foundComment})
        }
    })
    
})

// Comment Update
router.put("/:comment_id", checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.redirect("/themes/" + req.params.id)
        }
    })
})

// Comment Destroy Route
router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
    // Find by id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back")
        } else {
            res.redirect("/themes/" + req.params.id)
        }
    })
})

// middleware

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back")
            } else {
                // does the user owns comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect("back")
                }
                
            }
        })
    } else {
        res.redirect("back")
    }
}

// Checking condition if user logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router