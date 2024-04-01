const express = require('express');
const app = express();
const port = 11000;
const host = "192.168.8.214"
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// using MySQL
var mysql = require('mysql2');

app.use('/css', express.static(__dirname + '/demo_ui/css'));
// connect to database

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "###",
    database: "demo"
});

// check connection

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!")
});


app.get('/sign_up', (req, res) => {
    res.sendFile(__dirname + "/demo_ui/signup.html");
});

app.post('/sign_up', (req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const query = `INSERT INTO Account (username, password) VALUES (?, ?)`;
    con.query(query, [username, password], (err, results) => {
        if (err) throw err;
        let userid;
        con.query("SELECT * FROM Account WHERE username = ? AND password = ?", [username, password], (err, result)=> {
            if (err) throw err;
            userid = result[0].user_id;
            const query_2 = `INSERT INTO user_infor (user_id, fullname, email) VALUES (?, ?, ?)`;
            con.query(query_2, [userid, fullname, email], (err, results) => { 
            if (err) throw err;
            res.send("Đăng kí thành công!");
        } );
        });
        
    });
    return res.redirect('/sign_in')
});


app.get('/sign_in', (req, res) => {
    res.sendFile(__dirname + "/demo_ui/signin.html");
});

app.post('/sign_in', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // câu lệnh query
    const query = `SELECT * FROM Account WHERE username = ? AND password = ?`;
    con.query(query, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            var fullname;
            const userId = results[0].user_id;
            const query_2 = `SELECT * FROM user_infor WHERE user_id = ?`;
            con.query(query_2, [userId], (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    fullname = result[0].fullname;
                }
                return res.redirect(`/hello?fullname=${encodeURIComponent(fullname)}`);
            })
            
        } else {
            res.send("Đăng nhập không thành công. Username hoặc password không đúng!")
        }
    });
   
});
app.get('/hello', (req, res) => {
    res.sendFile(__dirname + "/demo_ui/hello.html");
});
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});