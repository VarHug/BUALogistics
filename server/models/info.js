var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InfoSchema = new Schema({
  title: {
    type: String
  },
  releaseUnit: {
    type: String
  },
  releaseTime: {
    type: Number
  },
  author: {
    type: String
  },
  tel: {
    type: Number
  },
  msg: {
    type: String
  }
});

module.exports = mongoose.model('Info', InfoSchema, 'info');
