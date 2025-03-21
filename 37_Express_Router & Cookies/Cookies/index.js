const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
  const { name = 'No-name' } = req.cookies;
  res.send(`안녕! ${name}`);
});

app.get('/setname', (req, res) => {
  res.cookie('name', 'henri');
  res.cookie('animal', 'shrimp');
  res.send('쿠키 보내기');
});

app.get('/getsignedcookie', (req, res) => {
  res.cookie('fruit', 'grape', { signed: true });
  res.send('쿠키에 서명');
});

app.get('/verifyfruit', (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.send(req.signedCookies);
});

app.listen(3000, () => {
  console.log('서빙!');
});
