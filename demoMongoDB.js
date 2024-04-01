var express=require("express");
var bodyParser=require("body-parser");
 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
 
var app=express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname));

app.post('/sign_up', function(req,res){
    var fullname = req.body.fullname;
    var email = req.body.email;
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
         
    return res.status(200).send("Signup successfully");
})


app.post('/sign_in', function(req,res){
    var username =req.body.username;
    var password = req.body.password;
 
    var data = {
        "username": username,
    }

    db.collection('accounts').findOne(data,function(err, user){
        if (err) throw err;
        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }
        if ( user.password == password){
            console.log("Login successfully");
            return res.status(200).send("Hello ", username);
        }
    });
})




app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('main.html');
}).listen(3000)