var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/technographics', function(req, res, next) {
    res.render('technographics');
});

router.get('/errors', function(req, res, next) {
    res.render('errors');
});

router.get('/performance', function(req, res, next) {
    res.render('performance');
});

module.exports = router;