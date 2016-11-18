var express = require("express");
var router  = express.Router();
var Theme = require("../models/theme")

//INDEX - show all themes
router.get("/", function(req, res){
    // Get all themes
    Theme.find({}, function(err, allThemes){
       if(err){
           console.log(err);
       } else {
          res.render("themes/index",{allThemes:allThemes});
       }
    });
    //res.render("themes",{themes:themes});
});

//CREATE - add new theme to DB
router.post("/", isLoggedIn,function(req, res){
    // get data from form and add to themes array
    var name = req.body.name;
    var image = req.body.image;
    var timeFrame = req.body.timeFrame;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newTheme = {name: name, image: image, description: desc, timeFrame: timeFrame, author: author}
    
    // Create a new theme and save to DB
    Theme.create(newTheme, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to themes page
            res.redirect("/themes");
        }
    });
});

//NEW - show form to create new theme
router.get("/new", isLoggedIn,function(req, res){
   res.render("themes/new"); 
});

// SHOW - shows more info about one theme
router.get("/:id", function(req, res){
    //find the theme with provided ID
    Theme.findById(req.params.id).populate("comments").exec(function(err, foundTheme){
        if(err){
            console.log(err);
        } else {
            console.log(foundTheme)
            //render show template with that theme
            res.render("themes/show", {theme: foundTheme});
        }
    });
})

// EDIT THEMES ROUTE
router.get("/:id/edit", checkThemeOwnership,function(req, res) {
    // is user logged in??
    
        Theme.findById(req.params.id, function(err, foundTheme) {
            
            res.render("themes/edit", {theme: foundTheme})
        })
})

// UPDATE THEMES ROUTE
router.put("/:id", function(req, res) {
    // Find and Update the correct theme
    Theme.findByIdAndUpdate(req.params.id, req.body.theme, function(err, updatedTheme) {
        if (err) {
            res.redirect("/themes")
        } else {
            res.redirect("/themes/" + req.params.id)
        }
    })
})

// Delete and Destroy Theme
router.delete("/:id", function(req, res) {
    Theme.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/themes")
        } else {
           res.redirect("/themes")
        }
    })
})

// middleware

function checkThemeOwnership(req, res, next) {
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

// Checking condition if user logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router