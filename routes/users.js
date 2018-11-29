var express = require('express');
var router = express.Router();

var ResponseType = {
  INVALID_USERNAME: 0,
  INVALID_PASSWORD: 1,
  SUCCESS: 2,
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// User Info
router.get('/info', function(req, res, next) {
  if (req.session.isAuthenticated) {
    res.json({
      username: req.session.username,
      nickname: req.session.nickname
    });
  } else {
    res.json({
      username: '',
      nickname: ''
    });
  }
});

// 로그인
router.post('/signin', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var database = req.app.get('database');
  var users = database.collection('users');

  if (username !== undefined && password !== undefined) {
      users.findOne({ username: username }, function(err, result) {
        if (result) {
          if (password === result.password) {
            req.session.isAuthenticated = true;
            req.session.username = result.username;
            req.session.nickname = result.nickname;
            res.json({ result: ResponseType.SUCCESS });
          } else {
            res.json({ result:ResponseType.INVALID_PASSWORD });
          }
        } else {
          res.json({ result:ResponseType.INVALID_USERNAME });
        }
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
