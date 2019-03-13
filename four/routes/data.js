var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/technographics', function(req, res, next) {
    const connection = mysql.createConnection({
        user: 'root',
        password: 'space bar',
        database: 'collector'
    });
    var data; 
    connection.connect(function(err) {
        if (err) { console.log(err); }
        connection.query('', [], function (err, results) {
                if (err) { console.log(err); } 
                data = results; 
        });
    });
    res.render('technographics', data);
});

router.get('/errors', function(req, res, next) {
    const connection = mysql.createConnection({
        user: 'root',
        password: 'space bar',
        database: 'collector'
    });
    var data;
     
    connection.connect(function(err) {
        if (err) { console.log(err); }
        connection.query('SELECT * FROM error;', [], function (err, results) {
                if (err) { console.log(err); } 
                data = results; 
                console.log(data);
                return;
        });
    });



    res.render('errors', data);
});

router.get('/performance', function(req, res, next) {
    res.render('performance');
});

module.exports = router;