const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Progress = require('./progress');
var crypto = require('crypto');


// very basic stored info on users - need to add progress, perfect pitch models
const UserSchema = new Schema ({
  email: { type: String, unique: true },
  hash: String,
  salt: String,
  perfectPitch: [{type: Progress.ProgressSchema}],
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;