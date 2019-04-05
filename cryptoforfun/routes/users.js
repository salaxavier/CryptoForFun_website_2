var express = require('express');
var router = express.Router();

var User = require('../models/user');

//router.use(express.static('public'));

//Register
router.get('/register', function(req, res) {
  res.render('register');
  //res.sendfile('register.html');
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

module.exports = router;
