const puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();
  
async function printPdf(p){
  const browser = await puppeteer.launch({args: ['--enable-features=NetworkService', '--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']});
  const page = await browser.newPage();
  var url = 'https://134.209.48.201:5002/data/' + p;
  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.pdf({path: p + '.pdf', format: 'A4'});
  await browser.close();
};

router.get('/:page', function(req, res, next){
    let page = req.params.page;
    try {
        printPdf(page);
    } catch(err) {
        console.log(err);
    }
    return res.send(page+' pdf generated!');
});

module.exports = router;