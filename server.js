const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//routes
//////////////////////api///////////////////////////
const toDoList = require('./data/list.js');
const sampleList = require('./data/sample-list.json');

app.get('/api/list',function(req, res){
    res.json(toDoList);
});

app.post('/api/list',function(req, res){
    for(let key in req.body){
        if(!sampleList.hasOwnProperty(key)){
            return res.json({success: false});
        }
    }
    for(let key in sampleList){
        if(!req.body.hasOwnProperty(key)){
            return res.json({success: false});
        }
    }
    toDoList.push(req.body);
    res.json({success: true});
});

app.get('/api/list/:index', function(req, res){
    res.json(toDoList[req.params.index]);
});

app.delete('/api/list', function(req, res){
    for(let i=0;i<toDoList.length;i++){
        if (req.body===toDoList[i]){
            toDoList.splice(i,1);
            return res.json({success: true});
        }
    }
    return res.json({success: false});
});

app.put('/api/list/:index', function(req,res){
    toDoList.splice(req.params.index,req.body);
    //toDoList[req.params.index]=req.body;
    return res.json({success: true});

});

///////////////////////////////

//////////////////////////////html//

app.get('*',function(req, res){
    res.sendFile(path.join(__dirname, '../public/index.html'))
});



//////////////////////////////


app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
})



