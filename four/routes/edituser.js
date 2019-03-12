var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.post('/', function(req, res, next) {
    const connection = mysql.createConnection({
        user: 'root',
        password: 'space bar',
        database: 'collector'
    });
    let user = {
        id: req.user.id,
        username: req.user.username,
        password: req.user.password,
        admin: req.user.admin
    };
    console.log(req.body);
    if (req.user.admin) {
        connection.connect(function(err) {
            if (err) { console.log(err); }
            connection.query(
                'UPDATE Users SET username = ?, password = ?, admin = ? WHERE id = ?;'
                , [req.body.username, req.body.password, req.body.admin, req.body.id], function (err, results, fields) {
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