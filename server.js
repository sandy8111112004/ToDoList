const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/ToDoDB",{useNewUrlParser: true});

//routes
//////////////////////api///////////////////////////

require('./routes/api_routes.js')(app);

//////////////////////////////


app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
})



