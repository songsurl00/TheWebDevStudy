// 로그인을 한 상태인지 확인하는 미들웨어
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', '먼저 로그인을 해야합니다');
    return res.redirect('/login');
  }
  next();
};

// 이전 페이지를 저장하는 미들웨어
module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo; // locals에 이전 페이지 정보 세션을 저장
  }
  next();
};
