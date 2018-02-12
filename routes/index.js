var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET half app home page. */
router.get('/', function(req, res, next) {
    res.render('form', { title: 'Form' });
});

module.exports = router;
