var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RepairSchema = new Schema({
  'content': String,
  'author': String,
  'time': Number,
  'reply': String,
  'state': Number
});

module.exports = mongoose.model('Repair', RepairSchema, 'repair');
