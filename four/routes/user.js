var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/profile', function(req, res, next) {
    res.render('userprofile');
});

router.get('/admin', function(req, res, next) {
    res.render('useradmin');
});

module.exports = router;