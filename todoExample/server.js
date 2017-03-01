var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;

var db = require('mongoskin').db('mongodb://user:pwd@127.0.0.1:27017/tododb');

app.get("/", function (req, res) {
      res.redirect("/index.html");
});


var todoList = [];



app.get("/addTodo", function (req, res) {
  db.collection("data").insert(req.query, function(err, result){
      if(err){
        res.send("error"); 
      }
      else{
        db.collection("data").find({}).toArray( function(err1, result1) {
          res.send(JSON.stringify(result1));
        });
      }
  });
   // todoList.push(req.query);
   // res.send(JSON.stringify(todoList));
});


app.get("/deleteTodo", function (req, res) {
    var id = req.query.id.toString();
   db.collection("data").remove({id: id}, function(err, result){
      if(err){
        res.send("error"); 
      }
      else{
        db.collection("data").find({}).toArray( function(err1, result1) {
          res.send(JSON.stringify(result1));
        });
      }
   });
   // todoList.splice(index,1);
   // res.send(JSON.stringify(todoList));
});

app.get("/getTodos", function (req, res) {
  db.collection("data").find({}).toArray( function(err, result) {
    res.send(JSON.stringify(result));
  });

   // res.send(JSON.stringify(todoList));
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
