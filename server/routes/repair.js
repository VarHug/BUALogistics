var express = require('express');
var mongoose = require('mongoose');
var Repairs = require('../models/repair');
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
  Repairs.find({}, function (err, doc) {
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

router.post('/', function (req, res) {
  let repairParam = req.body.params;
  let repair = new Repairs({
    content: repairParam.content,
    author: repairParam.author,
    time: repairParam.time,
    reply: '',
    state: repairParam.state
  });

  repair.save((err, result) => {
    if (err) {
      console.log('Error:' + err);
    } else {
      console.log('Result:' + result);
      res.send('OK');
    }
  });

  // let repair = req.body.params;
  // console.log(repair.author);
  // console.log(repair.content);
  // console.log(repair.time);
  // console.log(repair.reply);
  // console.log(repair.state);
});

module.exports = router;
