var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var themes = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg", timeFrame: "2:00am to 4:00am"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg", timeFrame: "2:00am to 4:00am"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg", timeFrame: "2:00am to 4:00am"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg" timeFrame: "2:00am to 4:00am"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg" timeFrame: "2:00am to 4:00am"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg" timeFrame: "2:00am to 4:00am"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg" timeFrame: "2:00am to 4:00am"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg" timeFrame: "2:00am to 4:00am"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg" timeFrame: "2:00am to 4:00am"}
];
    
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/themes", function(req, res){
    res.render("themes",{themes:themes});
});

app.post("/themes", function(req, res){
    // get data from form and add to themes array
    var name = req.body.name;
    var image = req.body.image;
    var newTheme = {name: name, image: image}
    themes.push(newTheme);
    //redirect back to themes page
    res.redirect("/themes");
});

app.get("/themes/new", function(req, res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Eine Server Has Started!");
});