var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Messages Schema
var MsgSchema = new Schema({
  cipher: {
    type: String,
    required: true
  },
  param: {
    type: String,
    required: false
  },
  to_user: {
    type: String,
    required: true
  },
  message_ciphered: {
    type: String,
    required: true
  }
});

//variable for messages model (DB collection)
var Msg = mongoose.model('messages', MsgSchema);
//Export module (Provide access to other files)
module.exports = Msg;

/*
var Msg = module.exports = mongoose.model('Msg', MsgSchema);

module.exports.createUser = function(newUser, callback){  //Hash with salt
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}
*/
