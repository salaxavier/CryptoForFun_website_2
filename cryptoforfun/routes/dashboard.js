var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var dbConn = mongodb.MongoClient.connect('mongodb://localhost/messages')


var Msg = require('../models/msg');
var User = require('../models/user');

//Send message ciphered with Caesar
router.get('/ciphers/caesar', ensureAuthenticated, function(req, res) {
  res.render('ciphers/caesar', {layout: 'dashb_layout.handlebars'});
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You must log in.');
    res.redirect('/users/login');
  }
}

router.get('/ciphers/bacon', ensureAuthenticated, function(req, res) {
  res.render('ciphers/bacon', {layout: 'dashb_layout.handlebars'});
});

router.get('/ciphers/rot13', ensureAuthenticated, function(req, res) {
  res.render('ciphers/rot13', {layout: 'dashb_layout.handlebars'});
});

router.get('/ciphers/substitution', ensureAuthenticated, function(req, res) {
  res.render('ciphers/substitution', {layout: 'dashb_layout.handlebars'});
});


router.post('/ciphers/caesar', function(req, res){
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
    res.render('ciphers/caesar',{ layout: 'dashb_layout.handlebars' },{
      errors:errors
    });
  } else{     //Submit form and create user
    //console.log('Successfully submitted');
    var newMsg = new Msg({
      cipher: cipher,
      param: param,
      to_user: to_user,
      message_ciphered: message_ciphered
    });/*
    Msg.createMsg(newMsg, function(err, user){
      if(err) throw err;
      console.log(user);
    });*/
    req.flash('success_msg', 'Message successfully sent.');

    res.redirect('/dashboard');
  }
});

//Read POST data
router.post('/ciphers/rot13', function (req, res) {
  dbConn.then(function(db) {
    db.collection('feedbacks').insertOne(req.body);
  });
  res.send('Data received:\n' + JSON.stringify(req.body));
});

//Read POSTed data
router.get('/inbox', function (req, res) {
  dbConn.then(function(db) {
    db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
      res.status(200).json(feedbacks);
    });
  });
});

module.exports = router;
