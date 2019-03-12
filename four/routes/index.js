var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let user = {
    id: req.user.id,
    username: req.user.username,
    password: req.user.password,
    admin: req.user.admin
  };
  res.render('index', {
    user: user
  });
});

module.exports = router;
