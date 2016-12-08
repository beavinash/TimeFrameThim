var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    flash           = require("connect-flash"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Theme           = require("./models/theme"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds")
    

// Development connection or Production connection

var url = process.env.DATABASEURL || "mongodb://localhost/eine_practice"

mongoose.connect(url);

// Production connection
// mongoose.connect("mongodb://avinash:elonMusk22@ds127878.mlab.com:27878/eine");
// mongodb://avinash:elonMusk22@ds127878.mlab.com:27878/eine
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(flash())
//console.log(__dirname)
// Database Seed
// seedDB();

// Passport Config
app.use(require("express-session")({
    secret: "Work super-hard for atleast 100hours and be best student!",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// the below function is used for sending user data to all templates
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error")
   res.locals.success = req.flash("success")
   next();
});

var themeRoutes = require("./routes/themes"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index")

// this below code used for accessing routes from routes folder
app.use("/", indexRoutes)
app.use("/themes", themeRoutes)
app.use("/themes/:id/comments", commentRoutes)

app.get("/", function(req, res){
    res.render("landing");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Eine Server Has Started!");
});