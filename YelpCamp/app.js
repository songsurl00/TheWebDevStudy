// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }
require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');

const userRoutes = require('./routes/users');
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');

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
app.use(
  mongoSanitize({
    replaceWith: '_'
  })
);

const sessionConfig = {
  name: 'session',
  secret: 'secret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
  // store:
};

app.use(session(sessionConfig));
app.use(flash());

// passport 라이브러리를 이용한 인증
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 세션 관리
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', userRoutes); // 회원가입, 로그인 라우팅
app.use('/campgrounds', campgroundsRoutes); // 캠프그라운드 라우팅
app.use('/campgrounds/:id/reviews', reviewsRoutes); // 리뷰 라우팅

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
