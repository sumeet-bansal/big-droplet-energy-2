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
        if (err) throw err;
        connection.query('SELECT * FROM error;', function (err, results, fields){
            if (err) throw err;
            console.log(results);
        });
    });
    connection.end();

    res.send(fields);
});

module.exports = router;
  