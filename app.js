var express     = require("express"),
    app         = express(),


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Eine Server Has Started!");
});