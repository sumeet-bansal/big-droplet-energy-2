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
			for (type in err_times) {
				let type_timestamps = err_times[type];
				let type_date_counts = new Array(7).fill(0);
				for (tts in type_timestamps) {
					let now = new Date();
					let prev = new Date(parseInt(type_timestamps[tts]));
					let diff = new moment.duration(now - prev);
					let diff_days = Math.abs(Math.round(diff.asDays()));
					if (diff_days < 7) {
						type_date_counts[diff_days] += 1;
					}
				}
				err_times[type] = type_date_counts;
			}
			console.log(err_times);
			res.render('errors', {
				data: dr,
				err_times: err_times
			});
		});
	});
});


router.get('/performance', function(req, res, next) {

	const connection0 = mysql.createConnection({
		user: 'root',
		password: 'space bar',
		database: 'new_schema'
	});

	var d0 = 0;
	var d1 = 0;
	var d2 = 0;
	var d3 = 0;
	var d4 = 0;
	var d5 = 0;
	var d6 = 0;
	var d7 = 0;
	var d8 = 0;
	var d9 = 0;
	var chr = [];
	var saf = [];
	var fir = [];

	var data;
	connection0.connect(function(err) {
		if (err) { console.log(err); }


//img 1 load time
connection0.query('SELECT * FROM slow_load', function (err, results) {
	if (err) { console.log(err); }
	data = results;

	for( var i=0; i < data.length; i++){
		var s = data[i].total;
		if (s < 1000){
			d0+=1;
		} if (s >= 1000 && s < 2000) {
			d1+=1;
		} if (s >= 2000 && s < 3000) {
			d2+=1;
		} if (s >= 3000 && s < 4000) {
			d3+=1;
		} if (s >= 4000 && s < 5000) {
			d4+=1;
		} if (s >= 5000 && s < 6000) {
			d5+=1;
		} if (s >= 6000 && s < 7000) {
			d6+=1;
		} if (s >= 7000 && s < 8000) {
			d7+=1;
		} if (s >= 8000 && s < 9000) {
			d8+=1;
		} if (s >= 9000 && s < 10000) {
			d9+=1;
		}



	}
});



connection0.query('select userAgent, total from cookie c, slow_load s where c.id = cookie', function (err, results) {
	if (err) { console.log(err); }
	data = results;


	for (var i = 0; i < data.length; i++) {
		var x = data[i].userAgent;
		if (x.includes("Safari") && !x.includes("Chrome")){
			saf.push(data[i].total);
		}
		if (x.includes("Chrome")) {
			chr.push(data[i].total);
		}
		if (x.includes("Firefox")) {
			fir.push(data[i].total);
		}
	}


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


//img 1 load time
connection.query('SELECT * FROM random_load', function (err, results) {
	if (err) { console.log(err); }
	data = results;


	var dr = {
		image1data: {
			img10k: 0,
			img11k: 0,
			img12k: 0,
			img13k: 0,
			img14k: 0,
			img15k: 0,
			img16k: 0,
		},
		image2data: {
			img0k: 0,
			img1k: 0,
			img2k: 0,
			img3k: 0,
			img4k: 0,
			img5k: 0,
			img6k: 0,
		},
		image3data: {
			img0k: 0,
			img1k: 0,
			img2k: 0,
			img3k: 0,
			img4k: 0,
			img5k: 0,
			img6k: 0,
		},
		imagedata: {
			img0k: 0,
			img1k: 0,
			img2k: 0,
			img3k: 0,
			img4k: 0,
			img5k: 0,
			img6k: 0,
			img7k: 0,
			img8k: 0,
			img9k: 0
		},
		imagedatas: {
			img0k: d0,
			img1k: d1,
			img2k: d2,
			img3k: d3,
			img4k: d4,
			img5k: d5,
			img6k: d6,
			img7k: d7,
			img8k: d8,
			img9k: d9
		},
		browserslow: {
			safariavg: calcAvg(saf),
			chromeavg: calcAvg(chr),
			firefoxavg: calcAvg(fir)
		}
	}


	for (var i = 0; i < data.length; i++) {

		var x = data[i].img1;
		if (x < 1000){
			dr.image1data.img10k = dr.image1data.img10k + 1;
		} if (x >= 1000 && x < 2000) {
			dr.image1data.img11k = dr.image1data.img11k + 1;
		} if (x >= 2000 && x < 3000) {
			dr.image1data.img12k = dr.image1data.img12k + 1;
		} if (x >= 3000 && x < 4000) {
			dr.image1data.img13k = dr.image1data.img13k + 1;
		} if (x >= 4000 && x < 5000) {
			dr.image1data.img14k = dr.image1data.img14k + 1;
		} if (x >= 5000 && x < 6000) {
			dr.image1data.img15k = dr.image1data.img15k + 1;
		} if (x >= 6000 && x < 7000) {
			dr.image1data.img16k = dr.image1data.img16k + 1;
		}

		var y = data[i].img2;
		if (y < 1000){
			dr.image2data.img0k = dr.image2data.img0k + 1;
		} if (y >= 1000 && y < 2000) {
			dr.image2data.img1k = dr.image2data.img1k + 1;
		} if (y >= 2000 && y < 3000) {
			dr.image2data.img2k = dr.image2data.img2k + 1;
		} if (y >= 3000 && y < 4000) {
			dr.image2data.img3k = dr.image2data.img3k + 1;
		} if (y >= 4000 && y < 5000) {
			dr.image2data.img4k = dr.image2data.img4k + 1;
		} if (y >= 5000 && y < 6000) {
			dr.image2data.img5k = dr.image2data.img5k + 1;
		} if (y >= 6000 && y < 7000) {
			dr.image2data.img6k = dr.image2data.img6k + 1;
		}


		var z = data[i].img3;
		if (z < 1000){
			dr.image3data.img0k = dr.image3data.img0k + 1;
		} if (z >= 1000 && z < 2000) {
			dr.image3data.img1k = dr.image3data.img1k + 1;
		} if (z >= 2000 && z < 3000) {
			dr.image3data.img2k = dr.image3data.img2k + 1;
		} if (z >= 3000 && z < 4000) {
			dr.image3data.img3k = dr.image3data.img3k + 1;
		} if (z >= 4000 && z < 5000) {
			dr.image3data.img4k = dr.image3data.img4k + 1;
		} if (z >= 5000 && z < 6000) {
			dr.image3data.img5k = dr.image3data.img5k + 1;
		} if (z >= 6000 && z < 7000) {
			dr.image3data.img6k = dr.image3data.img6k + 1;
		}


		var t = data[i].total;
		if (t < 1000){
			dr.imagedata.img0k = dr.imagedata.img0k + 1;
		} if (t >= 1000 && t < 2000) {
			dr.imagedata.img1k = dr.imagedata.img1k + 1;
		} if (t >= 2000 && t < 3000) {
			dr.imagedata.img2k = dr.imagedata.img2k + 1;
		} if (t >= 3000 && t < 4000) {
			dr.imagedata.img3k = dr.imagedata.img3k + 1;
		} if (t >= 4000 && t < 5000) {
			dr.imagedata.img4k = dr.imagedata.img4k + 1;
		} if (t >= 5000 && t < 6000) {
			dr.imagedata.img5k = dr.imagedata.img5k + 1;
		} if (t >= 6000 && t < 7000) {
			dr.imagedata.img6k = dr.imagedata.img6k + 1;
		} if (t >= 7000 && t < 8000) {
			dr.imagedata.img7k = dr.imagedata.img7k + 1;
		} if (t >= 8000 && t < 9000) {
			dr.imagedata.img8k = dr.imagedata.img8k + 1;
		} if (t >= 9000 && t < 10000) {
			dr.imagedata.img9k = dr.imagedata.img9k + 1;
		}

	}


/*

connection.query('SELECT * FROM slow_load', function (err, results) {
if (err) { console.log(err); }
data = results;

for( var i=0; i < data.length; i++){

var s = data[i].total;
if (s < 1000){
dr.imagedatas.img0k = dr.imagedatas.img0k + 1;
} if (s >= 1000 && s < 2000) {
dr.imagedatas.img1k = dr.imagedatas.img1k + 1;
} if (s >= 2000 && s < 3000) {
dr.imagedatas.img2k = dr.imagedatas.img2k + 1;
} if (s >= 3000 && s < 4000) {
dr.imagedatas.img3k = dr.imagedatas.img3k + 1;
} if (s >= 4000 && s < 5000) {
dr.imagedatas.img4k = dr.imagedatas.img4k + 1;
} if (s >= 5000 && s < 6000) {
dr.imagedatas.img5k = dr.imagedatas.img5k + 1;
} if (s >= 6000 && s < 7000) {
dr.imagedatas.img6k = dr.imagedatas.img6k + 1;
} if (s >= 7000 && s < 8000) {
dr.imagedatas.img7k = dr.imagedatas.img7k + 1;
} if (s >= 8000 && s < 9000) {
dr.imagedatas.img8k = dr.imagedatas.img8k + 1;
} if (s >= 9000 && s < 10000) {
dr.imagedatas.img9k = dr.imagedatas.img9k + 1;
}
}

});

*/





res.render('performance',{ data: dr });
});
});


/*
connection.query('SELECT * FROM slow_load', function (err, results) {
if (err) { console.log(err); }
data = results;

for( var i=0; i < data.length; i++){

var s = data[i].total;
if (s < 1000){
dr.imagedatas.img0k = dr.imagedatas.img0k + 1;
} if (s >= 1000 && s < 2000) {
dr.imagedatas.img1k = dr.imagedatas.img1k + 1;
} if (s >= 2000 && s < 3000) {
dr.imagedatas.img2k = dr.imagedatas.img2k + 1;
} if (s >= 3000 && s < 4000) {
dr.imagedatas.img3k = dr.imagedatas.img3k + 1;
} if (s >= 4000 && s < 5000) {
dr.imagedatas.img4k = dr.imagedatas.img4k + 1;
} if (s >= 5000 && s < 6000) {
dr.imagedatas.img5k = dr.imagedatas.img5k + 1;
} if (s >= 6000 && s < 7000) {
dr.imagedatas.img6k = dr.imagedatas.img6k + 1;
} if (s >= 7000 && s < 8000) {
dr.imagedatas.img7k = dr.imagedatas.img7k + 1;
} if (s >= 8000 && s < 9000) {
dr.imagedatas.img8k = dr.imagedatas.img8k + 1;
} if (s >= 9000 && s < 10000) {
dr.imagedatas.img9k = dr.imagedatas.img9k + 1;
}
}

});
*/

});

module.exports = router;
