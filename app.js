var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Theme       = require("./models/theme"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds")
    

mongoose.connect("mongodb://localhost/eine_practice");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();
    
app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all themes
app.get("/themes", function(req, res){
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
app.post("/themes", function(req, res){
    // get data from form and add to themes array
    var name = req.body.name;
    var image = req.body.image;
    var timeFrame = req.body.timeFrame;
    var desc = req.body.description;
    var newTheme = {name: name, image: image, description: desc, timeFrame: timeFrame}
    
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
app.get("/themes/new", function(req, res){
   res.render("themes/new"); 
});

// SHOW - shows more info about one theme
app.get("/themes/:id", function(req, res){
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

// ====================
// COMMENTS ROUTES
// ====================

app.get("/themes/:id/comments/new", function(req, res){
    // find campground by id
    Theme.findById(req.params.id, function(err, theme){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {theme: theme});
        }
    })
});

app.post("/themes/:id/comments", function(req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Eine Server Has Started!");
});