var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  'userName': String,
  'userType': String,
  'userId': Number,
  'userFind': Array,
  'userRepair': Array
});

module.exports = mongoose.model('User', UserSchema, 'users');
