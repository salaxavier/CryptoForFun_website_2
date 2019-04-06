var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var dbConn = mongodb.MongoClient.connect('mongodb://localhost/messages')

var Msg = require('../models/messages');

//Validation function
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You must log in.');
    res.redirect('/users/login');
  }
}


//GET ciphers routes
router.get('/ciphers/caesar', ensureAuthenticated, function(req, res) {
  res.render('ciphers/caesar', {layout: 'dashb_layout.handlebars'});
});

router.get('/ciphers/bacon', ensureAuthenticated, function(req, res) {
  res.render('ciphers/bacon', {layout: 'dashb_layout.handlebars'});
});

router.get('/ciphers/rot13', ensureAuthenticated, function(req, res) {
  res.render('ciphers/rot13', {layout: 'dashb_layout.handlebars'});
});

router.get('/ciphers/substitution', ensureAuthenticated, function(req, res) {
  res.render('ciphers/substitution', {layout: 'dashb_layout.handlebars'});
});



//POST ciphers routes

router.post('/ciphers/caesar', function(req, res){
  //Validation
    req.checkBody('to_user', 'Recipient is required').notEmpty();
    req.checkBody('message_ciphered', 'Message is required').notEmpty();
    var errors = req.validationErrors();

    if(errors){   //Invalid data supplied
      res.render('ciphers/caesar',{
        layout: 'dashb_layout.handlebars',
        errors:errors
      });
    } else{   //Create and save new object into the DB
    Msg.create(req.body).then(function(messages){
    });
    req.flash('success_msg', 'Message successfully sent.');
    res.redirect('/dashboard');
    };
  });



router.post('/ciphers/rot13', function (req, res) {
  //Validation
    req.checkBody('to_user', 'Recipient is required').notEmpty();
    req.checkBody('message_ciphered', 'Message is required').notEmpty();
    var errors = req.validationErrors();

    if(errors){   //Invalid data supplied
      res.render('ciphers/rot13',{
        layout: 'dashb_layout.handlebars',
        errors:errors
      });
    } else{   //Create and save new object into the DB
    Msg.create(req.body).then(function(messages){
    });
    req.flash('success_msg', 'Message successfully sent.');
    res.redirect('/dashboard');
    };
  });



router.post('/ciphers/bacon', function (req, res) {
//Validation
  req.checkBody('to_user', 'Recipient is required').notEmpty();
  req.checkBody('message_ciphered', 'Message is required').notEmpty();
  var errors = req.validationErrors();

  if(errors){   //Invalid data supplied
    res.render('ciphers/bacon',{
      layout: 'dashb_layout.handlebars',
      errors:errors
    });
  } else{   //Create and save new object into the DB
  Msg.create(req.body).then(function(messages){
  });
  req.flash('success_msg', 'Message successfully sent.');
  res.redirect('/dashboard');
  };
});



router.post('/ciphers/substitution', function (req, res) {
//Validation
  req.checkBody('to_user', 'Recipient is required').notEmpty();
  req.checkBody('message_ciphered', 'Message is required').notEmpty();
  var errors = req.validationErrors();

  if(errors){   //Invalid data supplied
    res.render('ciphers/substitution',{
      layout: 'dashb_layout.handlebars',
      errors:errors
    });
  } else{   //Create and save new object into the DB
  Msg.create(req.body).then(function(messages){
  });
  req.flash('success_msg', 'Message successfully sent.');
  res.redirect('/dashboard');
  };
});





//Update user data
router.put('/dashboard/:id', ensureAuthenticated, function (req, res) {
  Msg.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(messages){
    req.flash('success_msg', 'Your data has been updated. Please, relogin.');
    res.redirect('/login');
  });
});

//Get messages from Inbox
router.get('/inbox/:id', ensureAuthenticated, function (req, res) {
  Msg.findOne({_id: req.params.id}).then(function(messages){
    res.send(messages);
    //res.flash('message_msg', messages);   //Would this work? (must define message_msg in layout)
  });
});

//Get messages from Inbox (Retrieves all messages in DB)
router.get('/inbox', ensureAuthenticated, function (req, res) {
  Msg.find({}).then(function(messages){
    res.send(messages);
    //res.flash('message_msg', messages);   //Would this work? (must define message_msg in layout)
  });
});

//Delete data from Inbox
router.delete('/inbox/:id', ensureAuthenticated, function (req, res) {
  Msg.findByIdAndRemove({_id: req.params.id}).then(function(messages){
    req.flash('success_msg', 'Message deleted.');
    res.redirect('/inbox');
  });
});

module.exports = router;
