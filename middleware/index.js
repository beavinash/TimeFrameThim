var Theme = require("../models/theme")
var Comment = require("../models/comment")

// Middleware goes here
var middlewareObj = {}

middlewareObj.checkThemeOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Theme.findById(req.params.id, function(err, foundTheme) {
            if (err) {
                req.flash("error", "Theme not found!")
                res.redirect("back")
            } else {
                // does the user owns theme?
                if (foundTheme.author.id.equals(req.user._id)) {
                    next()
                } else {
                    req.flash("error", "You don't have permission")
                    res.redirect("back")
                }
                
            }
        })
    } else {
        req.flash("error", "You need to be logged in")
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back")
            } else {
                // does the user owns comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    req.flash("error", "You don't have permission")
                    res.redirect("back")
                }
                
            }
        })
    } else {
        req.flash("error", "You need to Login")
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login")
    res.redirect("/login");
}

module.exports = middlewareObj