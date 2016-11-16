var mongoose = require("mongoose")

// SCHEMA SETUP
var themeSchema = new mongoose.Schema({
       name: String,
       image: String,
       description: String,
       timeFrame: String,
        comments: [
          {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
          }
       ]
});

module.exports = mongoose.model("Theme", themeSchema);