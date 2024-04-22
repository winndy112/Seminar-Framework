const express = require('express');
const app = express();
const port = 11000;
const host = "127.0.0.1"
const bodyParser = require('body-parser');

// Connection to the database
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:duplicate@localhost:5432/demodb');


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('demo_ui'));
app.use(express.static('demo_ui/css'));


app
    .get('/sign_in', (req, res) => {
        res.sendFile(__dirname + "/demo_ui/signin.html");
    })
    .post('/sign_in', urlencodedParser, (req, res, next) => { // signin request
        db.one('SELECT * FROM usersaccount WHERE username = $1 AND passwd = $2', [req.body.username, req.body.password])
            .then(data => {
                let id = "\{" + data.id[0] + "\}";
                db.one('SELECT * FROM userinfo WHERE id = $1', [id])
                    .then(info => {
                        let mes = "<h1>Hello " + info.fullname + "</h1>";
                        return res.status(200).send(mes);
                    })
                    .catch(error => {
                        return res.status(401);
                    });
            })
            .catch(error => {
                return res.status(401).send("Login failed");
            });
    })
    .get('/sign_up', (req, res) => {
        res.sendFile(__dirname + "/demo_ui/signup.html");
    })
    .post('/sign_up', urlencodedParser, (req, res, next) => { // signup request
        db.any('SELECT username FROM usersaccount WHERE username = $1', [req.body.username])
            .then(data => {
                console.log('DATA:', data);
                if (data.length > 0) {
                    return res.status(409).send('Username already exists');
                }
                else {
                    let randomID = "\{" + (10000000 + Math.floor(Math.random() * 89999999)).toString() + "\}";
                    console.log(randomID);
                    db.one('INSERT INTO usersaccount (id, username, passwd) VALUES ($1, $2, $3) RETURNING id', 
                            [randomID, req.body.username, req.body.password])
                        .catch(error => {
                            return res.status(501).send('Internal server error');
                        });
                    console.log('BODY', req.body.fullname, req.body.email);
                    db.one('INSERT INTO userinfo (id, fullname, email) VALUES ($1, $2, $3) RETURNING id', [randomID, req.body.fullname, req.body.email])
                        .then(new_id => {
                            return res.status(200).redirect("/sign_in");
                            // return res.status(200).json({ message: "New user ID is " + new_id.id });
                        })
                        .catch(error => {
                            return res.status(501).json({ message: "Internal server error" });
                        });
                }
            })
            .catch(error => {
                return res.status(500).json({ message: "Internal server error" }); 
            });
    })
    .get('/', (req, res) => {
        return res.redirect("/sign_in");  
    });



app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
