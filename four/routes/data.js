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
        connection.query('SELECT img1 FROM random_load;', [], function (err, results) {
                if (err) { console.log(err); }
                data = results;
        });
    });
    res.render('errors', data);
});



/*
router.get('/errors', function(req, res, next) {
    const connection = mysql.createConnection({
        user: 'root',
        password: 'space bar',
        database: 'collector'
    });
    var data;
     
    connection.connect(function(err) {
        if (err) { console.log(err); }
        connection.query('SELECT img1 FROM random_load;', [], function (err, results) {
       		if (err) {                                                 
                                console.log(err);                                  
                                return res.status(500).send({                      
                                        message: 'Database read failed.'           
                                });                                                
                        }
		data = results;
		res.render('errors', data);
			
	}); 
    });

    // parse data
    // var dr = { 
    //     refErr: {count:0}, 
    //     typErr: {count:0}, 
    //     uriErr: {count:0}, 
    //     synErr: {count:0}, 
    //     rngErr: {count:0}, 
    //     evlErr: {count:0}
    // }
    // for (var i = 0; i < data.length; i++) {
    //     var type = data[i].errorMessage;
    //     console.log(type);
    // }

    /*
    res.render('errors', data);
    */
//});




router.get('/performance', function(req, res, next) {
    res.render('performance');
});

module.exports = router;
