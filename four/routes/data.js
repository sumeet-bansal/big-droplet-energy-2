var express = require('express');
var mysql = require('mysql');
var router = express.Router();


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
		
		var months = {
		
			January: 0,
			February: 0, 
			March: 0, 
			April: 0, 
			May: 0, 
			June: 0, 
			July: 0, 
			August: 0, 
			September: 0, 
			October: 0, 
			November: 0, 
			December: 0
		}

		var days = {
		
			Monday: 0,
			Tuesday: 0, 
			Wednesday: 0, 
			Thursday: 0, 
			Friday: 0, 
			Saturday: 0, 
			Sunday: 0
		}

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
			
		if( time != null ){

			var date = new Date(parseInt(time));
			var datemonth = date.getMonth();
			var dateday = date.getDay();
			
			switch(datemonth){
			case 0:months.January+=1;break;
			case 1:months.February+=1;break;
			case 2:months.March+=1;break;
			case 3:months.April+=1;break;
			case 4:months.May+=1;break;
			case 5:months.June+=1;break;
			case 6:months.July+=1;break;
			case 7:months.August+=1;break;
			case 8:months.September+=1;break;
			case 9:months.October+=1;break;
			case 10:months.November+=1;break;
			case 11:months.December+=1;break;
			
			}
		
			switch(dateday){
			case 0:days.Monday+=1;break;                       
                        case 1:days.Tuesday+=1;break;                           
                        case 2:days.Wednesday+=1;break;                                    
                        case 3:days.Thursday+=1;break;                                    
                        case 4:days.Friday+=1;break;                                      
                        case 5:days.Saturday+=1;break;                                     
                        case 6:days.Sunday+=1;break;
			}
		
		}

		}
		res.render('technographics', {data: dr, month: months, day: days});
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
		
		
	 	// parse data                                                                  
                var dr = {                                                          
                        refErr: 0,                                                  
                        typErr: 0,                                                  
                        uriErr: 0,                                                  
                        synErr: 0,                                                  
                        rngErr: 0,                                                           
                        evlErr: 0                                                   
                } 

		
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
		res.render('errors', {data: dr, test:[1,2,3,4]});
        });                                                                        
    });                                                                                                            
});


router.get('/performance', function(req, res, next) {
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
                    0: 0,
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0
                }
            }

            for (var i = 0; i < data.length; i++) {
                var x = data[i].img1;
                switch (x) {
                    case (x < 1000):
                        dr.image1data['0']++;
                        break;
                    case (x >= 1000 && x < 2000):
                        dr.image1data['1']++;
                        break;
                    case (x >= 2000 && x < 3000):
                        dr.image1data['2']++;
                        break;
                    case (x >= 3000 && x < 4000):
                        dr.image1data['3']++;
                        break;
                    case (x >= 4000 && x < 5000):
                        dr.image1data['4']++;
                        break;
                    case (x >= 5000 && x < 6000):
                        dr.image1data['5']++;
                        break;
                    case (x >= 6000 && x < 7000):
                        dr.image1data['6']++;
                        break;
                }
            }

            console.log(dr);
            
            res.render('performance',{ data: dr });
        });      
    });  
});

module.exports = router;
