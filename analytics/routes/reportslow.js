var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/', function(req, res, next) {
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

module.exports = router;

