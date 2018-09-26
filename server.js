const express = require('express');
const path = require('path');
const app = express();
//const PORT = 8080;
const PORT = process.env.PORT || 3000;
//environment variable to 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//routes
//////////////////////api///////////////////////////

require('./routes/api_routes.js')(app);


//////////////////////////////


app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
})



