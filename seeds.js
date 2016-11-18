var mongoose = require("mongoose")
var Theme = require("./models/theme")
var Comment = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah",
        timeFrame: "2:00am to 4:00am"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "blah blah blah",
        timeFrame: "2:00am to 4:00am"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah",
        timeFrame: "2:00am to 4:00am"
    }
]

function seedDB() {
    Theme.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     }
    // console.log("Removed Campgrounds!")
    // //add a few campgrounds
    //     data.forEach(function(seed){
    //         Theme.create(seed, function(err, theme){
    //             if(err){
    //                 console.log(err)
    //             } else {
    //                 console.log("added a theme");
    //                 //create a comment
    //                 Comment.create(
    //                     {
    //                         text: "This place is great, but I wish there was internet",
    //                         author: "Homer"
    //                     }, function(err, comment){
    //                         if(err){
    //                             console.log(err);
    //                         } else {
    //                             theme.comments.push(comment);
    //                             theme.save();
    //                             console.log("Created new comment");
    //                         }
    //                     });
    //             }
    //         });
    //     });
    })
}

module.exports = seedDB

