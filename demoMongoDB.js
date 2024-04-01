var express=require("express");
var bodyParser=require("body-parser");
 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
 
var app=express()
 
 
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function(req,res){
    var fullname = req.body.fullname;
    var email =req.body.email;
    var username =req.body.username;
    var password = req.body.password;
 
    var data = {
        "fullname": fullname,
        "email": email,
        "username": username,
        "password": password
    }
db.collection('accounts').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
             
    });
         
    // return res.redirect('signup_success.html');
})

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('main.html');
}).listen(3000)