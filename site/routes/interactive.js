var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('interactive');
});

router.post('/', function(req, res, next) {
  res.redirect('interactive');
});

module.exports = router;
