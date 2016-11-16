var mongoose = require("mongoose")

// SCHEMA SETUP
var themeSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   timeFrame: String,
});

module.exports = mongoose.model("Theme", themeSchema);