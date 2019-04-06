var express = require('express');
var router = express.Router();

//var Msg = require('../models/msg');
//router.use(express.static('public'));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
  //res.sendfile('index.html');
});

router.get('/dashboard', ensureAuthenticated, function(req, res) {
  res.render('dashboard');
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

router.get('/dashboard/caesar', ensureAuthenticated, function(req, res) {
  res.render('dashboard/caesar', {layout: 'dashb_layout.handlebars'});
});

router.get('/dashboard/bacon', ensureAuthenticated, function(req, res) {
  res.render('dashboard/bacon', {layout: 'dashb_layout.handlebars'});
});

router.get('/dashboard/rot13', ensureAuthenticated, function(req, res) {
  res.render('dashboard/rot13', {layout: 'dashb_layout.handlebars'});
});

router.get('/dashboard/substitution', ensureAuthenticated, function(req, res) {
  res.render('dashboard/substitution', {layout: 'dashb_layout.handlebars'});
});


/*
//Send message ciphered with Caesar

router.post('/dashboard/caesar', function(req, res){
  var cipher = req.body.cipher;
  var param = req.body.param;
  var to_user = req.body.to_user;
  var message_ciphered = req.body.message_ciphered;

  console.log(cipher);
  console.log(param);
  console.log(to_user);
  console.log(message_ciphered);
//Validation
  req.checkBody('to_user', 'Recipient is required').notEmpty();
  req.checkBody('message_ciphered', 'Message is required').notEmpty();
  var errors = req.validationErrors();

  if(errors){   //Invalid data supplied
    //console.log('Invalid data');
    res.render('/dashboard/caesar',{
      errors:errors
    });
  } else{     //Submit form and create user
    //console.log('Successfully submitted');
    var newMsg = new Msg({
      cipher: cipher,
      param: param,
      to_user: to_user,
      message_ciphered: message_ciphered
    });
    User.createUser(newUser, function(err, user){     //Submit info NOT as a new user
      if(err) throw err;
      console.log(user);
    });
    req.flash('success_msg', 'Message successfully sent.');

    res.redirect('/dashboard');
  }
});
*/
module.exports = router;
