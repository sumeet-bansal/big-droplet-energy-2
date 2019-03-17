var express = require('express');
var mysql = require('mysql');
var moment = require('moment');
var router = express.Router();


function calcAvg (arr) {
	var sum = 0;
	for (var i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return (sum/arr.length);
}

// let calcAvg = (array) => array.reduce((a, b) => a + b) / array.length;

router.get('/technographics', function(req, res, next) {
	const connection = mysql.createConnection({
		user: 'root',
		password: 'space bar',
		database: 'new_schema'
	});
	var data;
	connection.connect(function(err) {
		if (err) { console.log(err); }
		connection.query('SELECT * FROM cookie;', [], function (err, results) {
			if (err) { console.log(err); }
			data = results;

			// parse data
			var dr = {
				firefox: 0,
				seamonkey: 0,
				chrome: 0,
				chromium: 0,
				safari: 0,
				opera: 0,
				explorer: 0,
				other: 0,
				desktop: 0,
				mobile: 0,
			}

			let months = new Array(12).fill(0);
			let days = new Array(7).fill(0);
			let hours = new Array(24).fill(0);

			//int loc = 0;
			for (var i = 0; i < data.length; i++) {

				var browser = data[i].userAgent;
				if(browser != null){
					if( browser.indexOf("Firefox") >= 0 && !browser.includes('Seamonkey')){
						dr.firefox = dr.firefox + 1;
					}else if ( browser.indexOf('Seamonkey') >= 0 ){
						dr.seamonkey += 1;
					}else if( browser.indexOf('Chrome') >= 0 && browser.indexOf('Chromium') < 0){
						dr.chrome += 1;
					}else if (browser.indexOf('Chromium')>= 0){
						dr.chromium += 1;
					}else if (browser.indexOf('Safari') >= 0 && browser.indexOf('Chrome') < 0 && browser.indexOf('Chromium') < 0){
						dr.safari += 1;
					}else if (browser.indexOf('OPR') >= 0 || browser.indexOf('Opera') >= 0){
						dr.opera += 1;
					}else if (browser.indexOf('MSIE') >= 0 ){
						dr.explorer += 1;
					}else{
						dr.other += 1;
					}
					if(browser.indexOf("Mobile") >= 0){
						dr.mobile += 1;
					}else{
						dr.desktop += 1;
					}
				}

				var time = data[i].timestamp;

				if (time != null) {
					var date = new Date(parseInt(time));
					months[date.getMonth()] += 1;
					days[date.getDay()] += 1;
					hours[date.getHours()] += 1;
				}

			}
			res.render('technographics', {data: dr, month: months, day: days, hours: hours});
		});
	});
});

router.get('/errors', function(req, res, next) {
	let accesses = null;
	const conn = mysql.createConnection({
		user: 'root',
		password: 'space bar',
		database: 'new_schema'
	});
	conn.connect(err => {
		if (err) {
			console.log(err);
		}
		conn.query('SELECT timestamp, count FROM cookie', (error, results, fields) => {
			conn.end();
			if (error) {
				console.log(error);
			}
			accesses = results;
		});
	});
	const connection = mysql.createConnection({
		user: 'root',
		password: 'space bar',
		database: 'new_schema'
	});
	var data;
	connection.connect(function(err) {
		if (err) { console.log(err); }
		connection.query('SELECT * FROM error;', [], function (err, results) {
			if (err) { console.log(err); }
			data = results;
			var dr = { refErr: 0, typErr: 0, uriErr: 0, synErr: 0, rngErr: 0, evlErr: 0 };

			for (var i = 0; i < data.length; i++) {
				var type = data[i].errorMessage;
				var n = type.indexOf(':');
				type = type.substring(0, n != -1 ? n : type.length);

				if(type == "ReferenceError"){
					dr.refErr = dr.refErr + 1;
				}
				else if( type == "Uncaught EvalError"){
					dr.evlErr = dr.evlErr + 1;
				}
				else if( type == "Uncaught RangeError"){
					dr.rngErr = dr.rngErr + 1;
				}
				else if( type == "Uncaught SyntaxError"){
					dr.synErr = dr.synErr + 1;
				}
				else if( type == "Uncaught TypeError"){
					dr.typErr = dr.typErr + 1;
				}
				else if( type == "Uncaught URIError"){
					dr.uriErr = dr.uriErr + 1;
				}
			}

			// groups timestamps by error
			let err_times = {};
			for (let i = 0; i < data.length; i++) {
				let type = data[i].errorMessage;
				let n = type.indexOf(':');
				type = type.substring(0, n != -1 ? n : type.length);
				if (!(type in err_times)) {
					err_times[type] = []
				}
				if (data[i].timestamp != null) {
					err_times[type].push(data[i].timestamp);
				}
			}

			// aggregates timestamps per error into how many 1 day ago, 2 days ago, ..., a week ago
			let now = new Date();
			for (type in err_times) {
				let type_timestamps = err_times[type];
				let type_date_counts = new Array(7).fill(0);
				for (tts in type_timestamps) {
					let prev = new Date(parseInt(type_timestamps[tts]));
					let diff = new moment.duration(now - prev);
					let diff_days = Math.abs(Math.round(diff.asDays()));
					if (diff_days < 7) {
						type_date_counts[diff_days] += 1;
					}
				}
				err_times[type] = type_date_counts;
			}

			// aggregates general accesses into how many (same as above block)
			let access_date_counts = new Array(7).fill(0);
			for (row in accesses) {
				let prev = new Date(parseInt(accesses[row].timestamp));
				let diff = new moment.duration(now - prev);
				let diff_days = Math.abs(Math.round(diff.asDays()));
				if (diff_days < 7) {
					access_date_counts[diff_days] += accesses[row].count;
				}
			}

			res.render('errors', {
				data: dr,
				err_times: err_times,
				acc_times: access_date_counts
			});
		});
	});
});


router.get('/performance', function(req, res, next) {

	const connection = mysql.createConnection({
		user: 'root',
		password: 'space bar',
		database: 'new_schema'
	});

	let img_loads = new Array(3).fill(new Array(10).fill(0));
	let rand_totals = new Array(10).fill(0);
	let slow_totals = new Array(10).fill(0);
	let data = {};
	let browser_pages = {
		chr: {
			slow: [],
			rand: []
		},
		fir: {
			slow: [],
			rand: []
		},
		saf: {
			slow: [],
			rand: []
		}
	};

	connection.connect(function(err) {
		if (err) {
			console.log(err);
		}

		connection.query('SELECT * FROM random_load', function (err, results) {
			if (err) {
				console.log(err);
			}
			data.random_load = results;
			for (let i = 0; i < results.length; i++) {
				if (results[i] == undefined) {
					continue;
				}
				console.log(results[i]);
				for (let img = 0; img < img_loads.length; i++) {
					let index = Math.round(results[i]['img' + (img + 1)] / 1000);
					index = index > 9 ? 9 : index;
					img_loads[img][index] += 1;
				}
				let index = Math.round(results[i].total / 1000);
				index = index > 9 ? 9 : index;
				rand_totals[index] += 1;
			}
			console.log('post query 1');
			connection.query('SELECT * FROM slow_load', function (err, results) {
				if (err) {
					console.log(err);
				}
				for (let i = 0; i < results.length; i++) {
					let index = Math.round(results[i].total / 1000);
					if (index > 9) {
						index = 9;
					}
					slow_totals[index] += 1;
				}
				console.log('post query 2');
				connection.query('SELECT total, userAgent FROM cookie c, random_load r WHERE c.id = r.cookie', function (err, results) {
					if (err) {
						console.log(err);
					}
					for (let i = 0; i < results.length; i++) {
						let x = results[i].userAgent;
						if (x.includes("Safari") && !x.includes("Chrome")) {
							browser_pages.saf.rand.push(results[i].total);
						}
						if (x.includes("Chrome")) {
							browser_pages.chr.rand.push(results[i].total);
						}
						if (x.includes("Firefox")) {
							browser_pages.fir.rand.push(results[i].total);
						}
					}
					browser_pages.chr.rand = calcAvg(browser_pages.chr.rand);
					browser_pages.fir.rand = calcAvg(browser_pages.fir.rand);
					browser_pages.saf.rand = calcAvg(browser_pages.saf.rand);
					console.log('post query 3');
					connection.query('SELECT total, userAgent FROM cookie c, slow_load s WHERE c.id = s.cookie', function (err, results) {
						if (err) {
							console.log(err);
						}
						data.slow_join = results;
						for (let i = 0; i < results.length; i++) {
							let x = results[i].userAgent;
							if (x.includes("Safari") && !x.includes("Chrome")) {
								browser_pages.saf.slow.push(results[i].total);
							}
							if (x.includes("Chrome")) {
								browser_pages.chr.slow.push(results[i].total);
							}
							if (x.includes("Firefox")) {
								browser_pages.fir.slow.push(results[i].total);
							}
						}
						browser_pages.chr.slow = calcAvg(browser_pages.chr.slow);
						browser_pages.fir.slow = calcAvg(browser_pages.fir.slow);
						browser_pages.saf.slow = calcAvg(browser_pages.saf.slow);
						console.log('post query 4');
						console.log(img_loads);
						console.log(rand_totals);
						console.log(slow_totals);
						console.log(browser_pages);
						connection.end();
						return res.render('performance', {
							img_loads: img_loads,
							rand_totals: rand_totals,
							slow_totals: slow_totals,
							browser_pages: browser_pages
						});
					});
				});
			});
		});
	});
});

module.exports = router;