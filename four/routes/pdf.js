const puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();
  
async function printPdf(p){
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  var url = 'https://134.209.48.201:5002/' + p;
  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.pdf({path: p + '.pdf', format: 'A4'});
  await browser.close();
};

router.get('/:page', function(req, res, next){
    printPdf(page);
});