var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signin');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/logout', function(req, res, next) {
  res.clearCookie("token");
  res.render('logout');
});

module.exports = router;
