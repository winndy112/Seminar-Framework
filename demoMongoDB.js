var express=require("express");
var bodyParser=require("body-parser");

var host = "127.0.0.1";
var port = 11000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thuy:1@frameworkmongo.stvic0h.mongodb.net/users');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
 
var app=express();
app.use(bodyParser.json());
app.use(express.static('demo_ui'));
app.use('/css', express.static(__dirname + '/demo_ui/css'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/sign_up', (req, res) => {
    res.sendFile(__dirname + "/demo_ui/signup.html");
});

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
app.get('/hello', (req, res) => {
    res.sendFile(__dirname + "/demo_ui/hello.html");
});

app.get('/sign_in', (req, res) => {
    res.sendFile(__dirname + "/demo_ui/signin.html");
});

app.post('/sign_in', function(req,res){
    var username =req.body.username;
    var password = req.body.password;
 
    var data = {
        "username": username
    }
    console.log(username);

    db.collection('accounts').findOne(data,function(err, user){
        if (err) throw err;
        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }
        if ( user.password == password){
            console.log("Login successfully");
            return res.redirect(`/hello?fullname=${encodeURIComponent(username)}`);
        }
    });
})


app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    
    return res.sendFile(__dirname + "/demo_ui/signin.html");
})

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});