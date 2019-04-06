var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Msg = require('../models/msg');


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

/*
//Login
router.get('/login', function(req, res) {
  res.render('login');
  //res.sendfile('login.html');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Invalid Username or Password'});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid Username or Password'});
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local',{successRedirect:'/dashboard', failureRedirect:'/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/dashboard');
  });

router.get('/logout', function(req, res){
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login');
});

*/
module.exports = router;
