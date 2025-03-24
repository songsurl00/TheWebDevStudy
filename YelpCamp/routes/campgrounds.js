const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schemas');
const { isLoggedIn } = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// 모든 캠핑장 보기
router.get(
  '/',
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campground/index', { campgrounds });
  })
);

// 새 캠핑장 생성
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campground/new');
});

router.post(
  '/',
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res) => {
    // if (!req.body.campground) throw new ExpressError('유효하지 않은 캠프장 데이터입니다', 400);
    const newCamp = new Campground(req.body.campground);
    await newCamp.save();
    req.flash('success', '새 캠핑장을 생성했습니다.');
    res.redirect(`/campgrounds/${newCamp._id}`);
  })
);

// 캠핑장 상세보기
router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    if (!campground) {
      req.flash('error', '캠핑장을 찾을 수 없습니다.');
      res.redirect('/campgrounds');
    }
    res.render('campground/show', { campground });
  })
);

// 캠핑장 수정
router.get(
  '/:id/edit',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
      req.flash('error', '캠핑장을 찾을 수 없습니다.');
      res.redirect('/campgrounds');
    }
    res.render('campground/edit', { campground });
  })
);

router.put(
  '/:id',
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', '캠핑장을 업데이트했습니다.');
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

// 캠핑장 삭제
router.delete(
  '/:id',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', '캠핑장을 삭제했습니다.');
    res.redirect('/campgrounds');
  })
);

module.exports = router;
