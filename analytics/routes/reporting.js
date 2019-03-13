var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const options = {
	user: 'root',
	password: 'space bar',
	database: 'new_schema'
}

router.get('/:table', function(req, res) {
	let table = req.params.table;
	if (table == 'slow' || table == 'random') {
		table += '_load';
	} else if (table == 'form') {
		table = 'form_data';
	} else if (table != 'cookie' && table != 'error') {
		return res.status(404).send({
			message: 'Invaild route.'
		});
	}
	const connection = mysql.createConnection(options);
	connection.connect(err => {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Unable to connect to the database.'
			});
		}
		connection.query('SELECT * FROM ' + table, (error, results, fields) => {
			connection.end();
			if (err) {
				console.log(err);
				return res.status(500).send({
					message: 'Database read failed.'
				});
			}
			return res.render('reporting', {
				headers: Object.keys(results[0]),
				data: results.map(row => ({...row}))
			});
		});
	});
});

module.exports = router;