var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.post('/', function(req, res, next) {
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
            connection.query(
                'INSERT INTO users (username, password, admin) VALUES (?,?,?);'
                , [req.body.username, req.body.password, req.body.admin], function (err, results, fields) {
                if (err) { console.log(err); } 
                return;
            });
        });
    } else {
        res.render('notadmin', {
            user: user
        });
    }
});

module.exports = router;