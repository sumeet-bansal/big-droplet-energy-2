var express = require('express');
var mysql = require('mysql');
var crypto = require('crypto');
var router = express.Router();

const options = {
	user: 'root',
	password: 'space bar',
	database: 'collector'
}

router.post('/error', function(req, res) {
	let params = JSON.parse(req.body.data);
	const connection = mysql.createConnection(options);
	connection.connect(err => {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Unable to connect to the database.'
			});
		}
		connection.query('INSERT INTO error SET ?', params, (error, results, fields) => {
			connection.end();
			if (error) {
				console.log(error);
				return res.status(500).send({
					message: 'Database insert failed.'
				});
			}
			return res.status(200).send({
				message: 'Database insert successful.'
			});
		});
	});
});

router.post('/activity', function(req, res) {
	let params = req.body;
	const connection = mysql.createConnection(options);
	connection.connect(err => {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Unable to connect to the database.'
			});
		}
		connection.query('INSERT INTO form_data SET ?', params, (error, results, fields) => {
			connection.end();
			if (error) {
				console.log(error);
				return res.status(500).send({
					message: 'Database insert failed.'
				});
			}
			return res.status(200).send({
				message: 'Database insert successful.'
			});
		});
	});
});

router.post('/log', function(req, res) {
	let params = JSON.parse(req.body.data);
	let table = params.page + '_load';
	delete params.page;
	const connection = mysql.createConnection(options);
	connection.connect(err => {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Unable to connect to the database.'
			});
		}
		connection.query('INSERT INTO ' + table + ' SET ?', params, (error, results, fields) => {
			connection.end();
			if (error) {
				console.log(error);
				return res.status(500).send({
					message: 'Database insert failed.'
				});
			}
			return res.status(200).send({
				message: 'Database insert successful.'
			});
		});
	});
});


router.get('/cookie', function(req, res) {
	let cookie = crypto.randomBytes(20).toString('hex');
	const connection = mysql.createConnection(options);
	connection.connect(err => {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Unable to connect to the database.'
			});
		}
		let ins = {id: cookie, timestamp: Date.now().toString()}
		connection.query('INSERT INTO cookie SET ?', ins, (error, results, fields) => {
			connection.end();
			if (error) {
				console.log(error);
				return res.status(500).send({
					message: 'Database insert failed.'
				});
			}
			return res.status(200).send({
				message: 'Database insert successful.',
				cookie: cookie
			});
		});
	});
});

module.exports = router;
