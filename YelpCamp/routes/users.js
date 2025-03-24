const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

// 회원가입
router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post(
  '/register',
  catchAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ email, username });
      const registerUser = await User.register(user, password);
      req.login(registerUser, err => {
        if (err) return next(err);
        req.flash('success', 'YelpCamp에 오신것을 환영합니다!');
        res.redirect('/campgrounds');
      });
    } catch (e) {
      req.flash('error', e.message);
      res.redirect('/register');
    }
  })
);

// 로그인
router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post(
  '/login',
  storeReturnTo,
  passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
  (req, res) => {
    req.flash('success', '어서오세요!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
  }
);

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', '로그아웃 하셨습니다!');
    res.redirect('/campgrounds');
  });
});

module.exports = router;
