var express = require('express');
var mysql = require('mysql');
var router = express.Router();



router.get('/error', function(req, res, next) {
    const connection = mysql.createConnection({
        user    : 'root',
        password: 'space bar',
        database: 'collector'
    });
    connection.connect(function(err) {
        if (err) { console.log(err); }
        connection.query('SELECT * FROM error;', function (err, results, fields){
            connection.end();
            if (err) { console.log(err); }
            res.render('reporterror', {data: results});
        });
    });
});

router.get('/random', function(req, res, next) {
    const connection = mysql.createConnection({
        user    : 'root',
        password: 'space bar',
        database: 'collector'
    });
    connection.connect(function(err) {
        if (err) { console.log(err); }
        connection.query('SELECT * FROM random_load;', function (err, results, fields){
            connection.end();
            if (err) { console.log(err); }
            res.render('reportrandom', {data: results});
        });
    });
});

router.get('/slow', function(req, res, next) {
    const connection = mysql.createConnection({
        user    : 'root',
        password: 'space bar',
        database: 'collector'
    });
    connection.connect(function(err) {
        if (err) { console.log(err); }
        connection.query('SELECT * FROM slow_load;', function (err, results, fields){
            connection.end();
            if (err) { console.log(err); }
            res.render('reportslow', {data: results});
        });
    });
});

router.get('/form', function(req, res, next) {
    const connection = mysql.createConnection({
        user    : 'root',
        password: 'space bar',
        database: 'collector'
    });
    connection.connect(function(err) {
        if (err) { console.log(err); }
        connection.query('SELECT * FROM form_data;', function (err, results, fields){
            connection.end();
            if (err) { console.log(err); }
            res.render('reportform', {data: results});
        });
    });
});

module.exports = router;