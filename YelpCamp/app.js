const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi');

const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const { campgroundSchema } = require('./schemas');

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

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// 메인 페이지
app.get('/', (req, res) => {
  res.render('home');
});

// 모든 캠프보기
app.get(
  '/campgrounds',
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campground/index', { campgrounds });
  })
);

// 새 캠프 생성
app.get('/campgrounds/new', (req, res) => {
  res.render('campground/new');
});

app.post(
  '/campgrounds',
  validateCampground,
  catchAsync(async (req, res) => {
    // if (!req.body.campground) throw new ExpressError('유효하지 않은 캠프장 데이터입니다', 400);
    const newCamp = new Campground(req.body.campground);
    await newCamp.save();
    res.redirect(`/campgrounds/${newCamp._id}`);
  })
);

// 캠프 상세보기
app.get(
  '/campgrounds/:id',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campground/show', { campground });
  })
);

// 캠프 수정
app.get(
  '/campgrounds/:id/edit',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campground/edit', { campground });
  })
);

app.put(
  '/campgrounds/:id',
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

// 캠프 삭제
app.delete(
  '/campgrounds/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
  })
);

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
