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
  var cookies = req.cookies;
  if (cookies.username !== undefined) {
    res.send('Welcome ' + cookies.username);
  } else {
    res.send('Who are you?');
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
            res.writeHead(200, {
              'Set-Cookie':['username=' + result.username + '; Path=/']
            });
            var ret = JSON.stringify({ result: ResponseType.SUCCESS });
            res.write(ret);
            res.end();
          } else {
            res.json({result:ResponseType.INVALID_PASSWORD});
          }
        } else {
          res.json({result:ResponseType.INVALID_USERNAME});
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
