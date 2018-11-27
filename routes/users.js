var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 사용자 등록
router.post('/add', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var nickname = req.body.nickname;
  var score = req.body.score;

  var database = req.app.get("database");
  var users = database.collection('users');

  users.insert([{ "username" : username, 
  "password" : password, 
  "nickname" : nickname, 
  "socre" : score }], function(err, result) {

  });

});

module.exports = router;
