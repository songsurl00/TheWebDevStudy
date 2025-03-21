const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const campgrounds = require('./routes/campground');
const reviews = require('./routes/reviews');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
}

main()
  .then(() => {
    console.log('몽고DB 연결');
  })
  .catch(err => {
    console.log('몽고DB 연결 에러');
    console.log(err);
  });

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
  secret: 'secret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
  // store:
}
app.use(session(sessionConfig));
app.use(flash());

// 세션을 이용한 플래시
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.use('/campgrounds', campgrounds) // 캠프그라운드 라우팅
app.use('/campgrounds/:id/reviews', reviews); // 리뷰 라우팅

// 메인 페이지
app.get('/', (req, res) => {
  res.render('home');
});

// 아무것도 라우팅 안됐을때 에러 처리
app.all('*', (req, res, next) => {
  next(new ExpressError('페이지를 찾을 수 없습니다', 404));
});

// 에러 처리
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = '뭔가 요류가 생겼습니다';
  res.status(statusCode).render('error', { err });
  res.send('에러');
});

app.listen(3000, () => {
  console.log('localhost:3000 연결');
});
