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
                }                                                                  
            }
        //img 1 load time 
        connection.query('SELECT * FROM random_load', function (err, results) {                         
            if (err) { console.log(err); }                        
            data = results;
        
		
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
	
		res.render('performance',{ data: dr });
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
            
            //res.render('performance',{ data: dr });
    });  
});

module.exports = router;
