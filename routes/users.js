var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 로그인
router.post('/signin', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var database = req.app.get('database');
  var users = database.collection('users');

  if (username !== undefined && password !== undefined) {
      users.find({ username: username }).toArray(function(err, result) {
        console.log(result);
      });
  }
});

// 사용자 등록
router.post('/add', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var nickname = req.body.nickname;
  // var score = req.body.score;

  var database = req.app.get("database");
  var users = database.collection('users');

  if (username !== undefined && password !== undefined 
    && nickname !== undefined) { //&& score != undefined) {
      users.insert([{ "username" : username, 
      "password" : password, 
      "nickname" : nickname }], function(err, result) {
      // "score" : score }], function(err, result) {
        res.status(200).send("success");
      });
  }

  
});

module.exports = router;
