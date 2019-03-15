const puppeteer = require('puppeteer');
const fs = require('fs');
var express = require('express');
var router = express.Router();
  
async function printPdf(p){
    const browser = await puppeteer.launch({args: ['--enable-features=NetworkService', '--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']});
    const page = await browser.newPage();
    var url = 'http://134.209.48.201:5002';

    // login
    await page.goto(url, {waitUntil: 'networkidle0'});
    await page.type('#username', 'root');
    await page.type('#password', 'space bar');
    await page.click('#action-button');
    await page.waitForNavigation();

    // get cookies
    const cookies = await page.cookies();

    // set cookies to navigate as user
    const page2 = await browser.newPage();
    await page2.setCookie(...cookies);
    await page2.goto(url+'/data/'+p, {waitUntil:'networkidle0'});

    await page2.pdf({path: 'routes/' + p + '.pdf', format: 'A4'});
    await browser.close();
};

router.get('/:page', function(req, res, next){
    let page = req.params.page;
    try {
        printPdf(page);
    } catch(err) {
        console.log(err);
    }
    res.download(__dirname +'/'+ page + '.pdf');
    try {
        fs.unlinkSync(__dirname +'/'+ page + '.pdf');
    } catch (err) {
        console.error(err);
    }
    return;
});

module.exports = router;