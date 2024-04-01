const express = require('express');
const app = express();
const port = 11000;
const host = "127.0.0.1"
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json()); // for parsing application/json


// Connection to the database
const db = pgp('postgres://postgres:duplicate@localhost:5432/demodb');


app
    .get('/signin', (req, res) => {
        res.sendFile(__dirname + "/demo_ui/signin.html");
    })
    .post('/signin', urlencodedParser, (req, res) => { // signin request
        db.one('SELECT * FROM useraccount WHERE username = $1 AND password = $2', [req.body.username, req.body.password])
            .then(data => {
                console.log('DATA:', data);
                if (data.length > 0) {
                    res.send('Login successful');
                } else {
                    res.send('Login failed');
                }
            })
            .catch(error => {
                console.log('ERROR:', error);
            });
        res.send('POST request to the homepage');
    })
    .get('/signup', (req, res) => {
        res.sendFile(__dirname + "/demo_ui/signup.html");
    })
    .post('/signup', urlencodedParser, (req, res) => { // signup request
        db.one('SELECT username FROM useraccount WHERE username = $1', [req.body.username])
            .then(data => {
                if (data) {
                    res.send('Username already exists');
                }
                else {
                    let randomID = 10000000 + Math.floor(Math.random() * 89999999);
                    db.one('INSERT INTO useraccount(id, username, password) VALUES($1, $2, $3) RETURNING id', [randomID.toString(), req.body.username, req.body.password])
                        .then(id => {
                            console.log('ID:', id);
                            res.send('New user ID is ' + id);
                        })
                        .catch(error => {
                            console.log('ERROR:', error);
                        });
                }
            })
    });
    


app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
