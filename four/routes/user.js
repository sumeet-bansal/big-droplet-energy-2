var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/profile', function(req, res, next) {
    let user = {
        id: req.user.id,
        username: req.user.username,
        password: req.user.password,
        admin: req.user.admin
    };
    res.render('userprofile', {
        user: user
    });
});

router.get('/admin', function(req, res, next) {
    const connection = mysql.createConnection({
        user: 'root',
        password: 'space bar',
        database: 'new_schema'
    });
    let user = {
        id: req.user.id,
        username: req.user.username,
        password: req.user.password,
        admin: req.user.admin
    };
    if (req.user.admin) {
        connection.connect(function(err) {
            if (err) { console.log(err); }
            connection.query('SELECT * FROM users;', function (err, results, fields) {
                if (err) { console.log(err); } 
                res.render('useradmin', {
                    user: user,
                    data: results
                });
            });
        });
    } else {
        res.render('notadmin', {
            user: user
        });
    }
});

module.exports = router;
