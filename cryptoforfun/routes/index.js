var express = require('express');
var router = express.Router();

var User = require('../models/user');

//router.use(express.static('public'));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
  //res.sendfile('index.html');
});

router.get('/dashboard', ensureAuthenticated, function(req, res) {
  var curr_user = req.user.name;
  res.render('dashboard', {
    user_name: curr_user
  });
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You must log in.');
    res.redirect('/users/login');
  }
}

router.get('/about', function(req, res) {
  res.render('about');
});

router.get('/bacon', function(req, res) {
  res.render('bacon');
});

router.get('/caesar', function(req, res) {
  res.render('caesar');
});

router.get('/rot13', function(req, res) {
  res.render('rot13');
});

router.get('/substitution', function(req, res) {
  res.render('substitution');
});



module.exports = router;
