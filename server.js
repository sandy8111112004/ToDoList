const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


//mongo database connection
mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://mingDatabase:password123456@dbh35.mlab.com:27357/heroku_mhzj4w0n",
    {
        userMongoClient: true
    }
);
//mongoose.connect("mongodb://localhost/ToDoDB",{useNewUrlParser: true});

//routes
//////////////////////api///////////////////////////

require('./routes/api_routes.js')(app);

//////////////////////////////


app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
})



