## big-droplet-energy2

Repo for WI19 CSE 135.

#### TODOS

1 - Collect Data from within some test pages (resolution, speed, etc.)

### Collection of Client Data

#### Resolution:

Install
npm install screenres --save

Get
var sr = require('screenres');
console.log(sr.get());

Set
var sr = require('screenres');
sr.set(800, 600));

#### Browser Type

Install
npm install browser-detect

Get
const router = express.Router();
const browser = require('browser-detect');

router.get('/', req => {
    const result = browser(req.headers['user-agent']);
    console.log(result);
});


Output
{
    name: 'chrome',
    version: '58.0.3029',
    versionNumber: 58.03029,
    mobile: false,
    os: 'Windows NT 10.0'
}

#### Load Time Performance




#### Connection Rates

### Runtime Data

#### JS ERRORS (window.onerror)
https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror

window.onerror = function (msg, url, lineNo, columnNo, error) {
  // ... handle error ...

  return false;
}

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' +  errorObj);
}

#### Mouse and Keyboard Events

https://wilix-team.github.io/iohook/usage.html#usage-in-a-generic-node-application

Install
npm install iohook --save # or yarn add iohook

Use
'use strict';

const ioHook = require('iohook');

ioHook.on('mousemove', event => {
  console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});

// Register and start hook
ioHook.start();

// Alternatively, pass true to start in DEBUG mode.
ioHook.start(true);










