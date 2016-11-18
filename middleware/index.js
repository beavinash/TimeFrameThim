var Theme = require("../models/theme")
var Comment = require("../models/comment")

// Middleware goes here
var middlewareObj = {}

middlewareObj.checkThemeOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Theme.findById(req.params.id, function(err, foundTheme) {
            if (err) {
                res.redirect("back")
            } else {
                // does the user owns theme?
                if (foundTheme.author.id.equals(req.user._id)) {
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
                    res.redirect("back")
                }
                
            }
        })
    } else {
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj