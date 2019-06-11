var express = require('express')
var app = express()
var path = require("path")


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
})


app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/static', express.static(__dirname + '/static'));

app.listen(3000);

console.log("app running on port 3000")
