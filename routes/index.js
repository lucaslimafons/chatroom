var express = require('express');
var router = express.Router();

router.use('/api/auth', require('./api/auth'));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
