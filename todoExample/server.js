var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;

app.get("/", function (req, res) {
      res.redirect("/index.html");
});


var todoList = [];


var addCallback = function (req, res) {
    console.log(req.query);
    todoList.push(req.query);

}
    res.send("Todo added!");


app.get("/addTodo", addCallback);



app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
