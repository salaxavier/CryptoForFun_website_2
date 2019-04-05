var express = require('express');
var router = express.Router();

//router.use(express.static('public'));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
  //res.sendfile('index.html');
});

router.get('/dashboard', ensureAuthenticated, function(req, res) {
  res.render('dashboard');
  //res.sendfile('index.html');
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('error_msg', 'You must log in.');
    res.redirect('/users/login');
  }
}

router.get('/about', function(req, res) {
  res.render('about');
  //res.sendfile('index.html');
});

router.get('/bacon', function(req, res) {
  res.render('bacon');
  //res.sendfile('index.html');
});

router.get('/caesar', function(req, res) {
  res.render('caesar');
  //res.sendfile('index.html');
});

router.get('/rot13', function(req, res) {
  res.render('rot13');
  //res.sendfile('index.html');
});

router.get('/substitution', function(req, res) {
  res.render('substitution');
  //res.sendfile('index.html');
});

module.exports = router;
