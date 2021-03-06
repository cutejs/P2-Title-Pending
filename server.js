// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
require("dotenv").config();

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;



// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-route.js")(app);

// Starts the server to begin listening
// =============================================================
if (process.env.UPDATE_MODELS){
  db.sequelize.sync({force: true}).then(function() {
    process.exit(0);
  });
} else {
  db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
      console.log("listening on port", PORT);
    });
  });
}
