var express = require('express');
var mongoose = require('mongoose');
var Find = require('../models/find');
var DB_URL = 'mongodb://localhost:27017/bua_data';

var router = express.Router();

mongoose.connect(DB_URL);

// 连接成功
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + DB_URL);
});
// 连接异常
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
// 连接断开
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

router.get('/', function (req, res, next) {
  Find.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.msg
      });
    } else {
      res.json({
        status: 0,
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  });
});

module.exports = router;
