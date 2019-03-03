var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const options = {
	user: 'root',
	password: 'space bar',
	database: 'collector'
}

router.post('/error', function(req, res) {
	let params = JSON.parse(req.body.data);
	let tags = ['userAgent', 'browserVersion', 'browserLanguage',
		'errorMessage', 'errorUrl', 'errorLine', 'errorColumn',
		'screenWidth', 'screenHeight'];
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

module.exports = router;
