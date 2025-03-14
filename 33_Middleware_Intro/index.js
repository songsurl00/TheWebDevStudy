const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

app.use('/dogs', (req, res, next) => {
  console.log('i love dogs');
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === 'chickennugget') {
    next();
  }
  res.send('패스워드가 필요합니다.');
}

// app.use((req, res, next) => {
//   console.log('내 첫번째 미들웨어');
//   return next();
//   console.log('내 첫번째 미들웨어 - next() 이후');
// })
// app.use((req, res, next) => {
//   console.log('내 두번째 미들웨어');
//   return next();
// })
// app.use((req, res, next) => {
//   console.log('내 세번째 미들웨어');
//   return next();
// })

app.get('/', (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send('홈페이지!');
});

app.get('/dogs', (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send('월월!');
});

app.get('/secret', verifyPassword, (req, res) => {
  res.send('내 비밀: 이건 비밀이야!');
});

app.use((req, res) => {
  res.status(404).send('NOT FOUND!');
});

app.listen(3000, () => {
  console.log('localhost:3000 연결');
});
