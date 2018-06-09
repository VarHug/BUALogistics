var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');
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
  User.find({}, function (err, doc) {
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

router.post('/', function(req, res) {
  let param = req.body.params;
  let id = param.userId;
  if (param.type === 'repair') {
    let updateStr = {$push:{userRepair:{
      content: param.content,
      author: param.author,
      time: param.time,
      reply: '',
      state: param.state
    }}};
  
    User.findByIdAndUpdate(id, updateStr, (err, result) => {
      if (err) {
        console.log('Error:' + err);
      } else {
        console.log('Result:' + result);
      }
    });
  } else if (param.type === 'find') {
    if (param.findtype === 'insert') {
      let updateStr = {$push:{userFind:{
        name: param.name,
        good: param.good,
        desc: param.desc,
        time: param.time,
        state: param.state
      }}};
  
      User.findByIdAndUpdate(id, updateStr, (err, result) => {
        if (err) {
          console.log('Error:' + err);
        } else {
          console.log('Result:' + result);
        }
      });
    } else if (param.findtype === 'update') {
      let wherestr = {
        'userId': param.userId,
        'userFind.time': param.time
      };
      let updatestr = {
        $set: {
          'userFind.$.state': param.state
        }
      }
      User.update(wherestr, updatestr, (err, result) => {
        if (err) {
          console.log('Error:' + err);
        } else {
          console.log('Result:' + result);
        }
      });
    }
  }
});

module.exports = router;
