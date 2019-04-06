var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');


//Register
router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
//  console.log(name);
//Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Invalid email address').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  var errors = req.validationErrors();

  if(errors){   //Invalid data supplied
    //console.log('Invalid data');
    res.render('register',{
      errors:errors
    });
  } else{     //Submit form and create user
    //console.log('Successfully submitted');
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });
    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });
    req.flash('success_msg', 'Register successful. You can now login.');

    res.redirect('/users/login');
  }
});

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
/*
router.get('/dashboard/caesar', ensureAuthenticated, function(req, res) {
  res.render('dashboard/caesar', {layout: 'dashb_layout.handlebars'}, { username: req.User.username });
});
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You must log in.');
    res.redirect('/users/login');
  }
}
*/
module.exports = router;
