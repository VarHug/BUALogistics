var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FindSchema = new Schema({
  'name': String,
  'good': String,
  'desc': String,
  'time': Number,
  'state': Number
});

module.exports = mongoose.model('Find', FindSchema, 'finds');
