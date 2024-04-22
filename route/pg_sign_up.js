const express = require('express')
const router = express.Router()

router.use(express.static('demo_ui'));

router
.get('/sign_up', (req, res) => {
    res.redirect("signup.html");
})
app.post('/sign_up', urlencodedParser, function(req, res, next) { // signup request
    db.one('SELECT username FROM usersaccount WHERE username = $1', [req.body.username])
        .then(data => {
            if (data) {
                res.send('Username already exists');
            }
            else {
                let randomID = 10000000 + Math.floor(Math.random() * 89999999);
                db.one('INSERT INTO usersaccount(id, username, password) VALUES($1, $2, $3) RETURNING id', [randomID.toString(), req.body.username, req.body.password])
                    .then(id => {
                        console.log('ID:', id);
                        res.send('New user ID is ' + id);
                    })
                    .catch(error => {
                        console.log('ERROR:', error);
                    });
            }
        })
        .catch(error => {
            console.log('ERROR:', error);
        });
    return 
});

module.exports = router