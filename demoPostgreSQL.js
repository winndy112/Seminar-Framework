const express = require('express');
const app = express();
const port = 11000;
const host = "127.0.0.1"
const pgp = require('pg-promise')();

// Connection to the database
const db = pgp('postgres://postgres:duplicate@localhost:5432/demodb');

app
    .get('/', (req, res) => {
        res.sendFile(__dirname + "/demo_ui/main.html");
    })
    .post('/', (req, res) => { // login request
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
    });
    


app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
