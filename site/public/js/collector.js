//---- Cookie Seting ----

var bigCookie;

var cookieSet = false;
c = document.cookie.split('; ');
for(i=c.length-1; i>=0; i--){
  C = c[i].split('=');
  if(C[0] == "bigDropletEnergy"){
    bigCookie = C[1];
    cookieSet = true;
    }
}

if(!cookieSet){
  var randCookie = Math.random().toString(16).substring(2, 15) + Math.random().toString(16).substring(2, 15);
  document.cookie = "bigDropletEnergy="+randCookie;
  bigCookie = randCookie;
}

//---- Sending Data ----

function sendData(data, endpoint){

  var http = new XMLHttpRequest();                                                   
  var url = 'http://134.209.48.201:5001/api/' + endpoint;                                  
  http.open('POST', url, true);                                                      
                                                                                   
  //Send the proper header information along with the request                        
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');        
                                                                                                                                                                    
  http.onreadystatechange = function() {//Call a function when the state changes. 
    if(http.readyState == 4 && http.status == 200) {                               
      alert(http.responseText);                                                  
    }                                                                              
  }                                                                                  
  http.send("data="+data); 
}

//---- Browser information ----

var UserAgent = navigator.userAgent;
var BrowserVersion = navigator.appVersion;
var BrowserLanguage = navigator.language;

//---- Resolution ----

var ScreenWidth = screen.width;
var ScreenHeight = screen.height;

//---- Mouse events ----

var clickX=0, clickY=0; 

document.addEventListener("click", function(evt){

  if ((evt.clientX || evt.clientY) && document.body && document.body.scrollLeft!=null) {                                             
    clickX = evt.clientX + document.body.scrollLeft;                                 
    clickY = evt.clientY + document.body.scrollTop;                                  
  }
  if ((evt.clientX || evt.clientY) &&
     document.compatMode=='CSS1Compat' &&
     document.documentElement &&
     document.documentElement.scrollLeft!=null) {
   clickX = evt.clientX + document.documentElement.scrollLeft;
   clickY = evt.clientY + document.documentElement.scrollTop;
  }
  if (evt.pageX || evt.pageY) {
    clickX = evt.pageX;
    clickY = evt.pageY;
  }

});


//---- Error detection ----                                                     
                                                                                
var ErrorMessage;                                                               
var ErrorUrl;                                                                   
var ErrorLine;                                                                  
var ErrorColumn;                                                                
var ErrorObj;                                                                   
                                                                                
window.onerror = function (errorMsg, url, lineNumber, column, obj){             
                                                                                
  alert('Error: ' + errorMsg + '\nURL: ' +url+ '\nLine Number:' +               
        lineNumber+ '\nColumn: ' +column);                    
                                                                                
  ErrorMessage = errorMsg;                                                      
  ErrorUrl = url;                                                               
  ErrorLine = lineNumber;                                                       
  ErrorColumn = column;                                                         

  var errorObj = {
    userAgent: UserAgent,
    browserVersion: BrowserVersion, 
    browserLanguage: BrowserLanguage,
    errorMessage: ErrorMessage,
    errorUrl: ErrorUrl,
    errorLine: ErrorLine.toString(),
    errorColumn: ErrorColumn.toString(),
    screenWidth: ScreenWidth.toString(),
    screenHeight: ScreenHeight.toString(),
    cookie: bigCookie
  };

  var json = JSON.stringify(errorObj);
  sendData(json, 'error')
}

//---- Reporting Initial Logging Data ----

var loggingObj = {                                                                 
    userAgent: UserAgent,                                                          
    browserVersion: BrowserVersion,                                                
    browserLanguage: BrowserLanguage,                                              
    screenWidth: ScreenWidth.toString(),                                           
    screenHeight: ScreenHeight.toString(),
    cookie: bigCookie
};

sendData(JSON.stringify(loggingObj), 'log');


//----- Timing Reports ----

var startTime, endTime;
var imageCount;
var imageLoaded = 0;
var arr;
var totalTime;

function startTime(imageNum){
  startTime = new Date();

  imageCount = imageNum;
  arr = new Array(imageNum);
}

function recordSlowTime(){
  endTime = new Date(); 

  totalTime = endTime - startTime;

  imageLoaded = imageLoaded + 1;

  if(imageLoaded == imageCount){

    var loadingObj = {                                                             
      userAgent: UserAgent,                                                        
      browserVersion: BrowserVersion,                                              
      browserLanguage: BrowserLanguage,                                            
      screenWidth: ScreenWidth.toString(),                                         
      screenHeight: ScreenHeight.toString(),                                       
      total: totalTime,                                                            
      page: "slow",
      cookie: bigCookie
    };

    var json = JSON.stringify(loadingObj);                                      
    sendData(json, 'log');                                                      
                                                                                
    alert("Loading Time: "+                                                    
          "\nTotal: " + totalTime + "ms");
  }
  
}

function recordRandomTime(imageNum){
  endTime = new Date();
  arr[imageNum] = endTime - startTime;
  
  imageLoaded = imageLoaded + 1;

  if(imageLoaded == imageCount){
    
    totalTime = endTime - startTime;
   
    var loadingObj = {
      userAgent: UserAgent,
      browserVersion: BrowserVersion,
      browserLanguage: BrowserLanguage,
      screenWidth: ScreenWidth.toString(),
      screenHeight: ScreenHeight.toString(),
      img1: arr[0],
      img2: arr[1],
      img3: arr[2],
      total: totalTime,
      page: "random",
      cookie: bigCookie
    };

    var json = JSON.stringify(loadingObj);                                          
    sendData(json, 'log');

    alert("Loading Times: "+
          "\nImage 1: " +arr[0]+ "ms"+
          "\nImage 2: " +arr[1]+ "ms"+
          "\nImage 3: " +arr[2]+ "ms"+
	  "\nTotal: " + totalTime + "ms");
  }



/*                                                                                 
                                                                                   
//---- Keyboard Events -----                                                       
                                                                                   
var presseKey;                                                                     
document.onkeypress = function(evt) {                                              
  evt = evt || window.event;                                                       
                                                                                   
  // Ensure we only handle printable keys                                          
  var charCode = typeof evt.which == "number" ? evt.which : evt.keyCode;           
                                                                                   
  if (charCode) {                                                                  
    pressedKey = charCode;                                                         
  }                                                                                
};                                                                                 
                                                                                   
*/



}
