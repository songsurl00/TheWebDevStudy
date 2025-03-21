const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false };

app.use(session(sessionOptions));

app.get('/viewcount', (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`이 페이지를 ${req.session.count}번 열었습니다.`);
});

app.get('/register', (req, res) => {
  const { username = 'Anonymous' } = req.query;
  req.session.username = username;
  res.redirect('/greet');
});

app.get('/greet', (req, res) => {
  const { username } = req.session;
  res.send(`다시와서 반가워요 ${username}`);
});

app.listen(3000, () => {
  console.log('3000번 연결');
});
