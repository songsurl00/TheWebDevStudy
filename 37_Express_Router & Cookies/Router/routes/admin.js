const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  if (req.query.isAdmin) {
    next();
  }
  res.send('어드민이 아닙니다');
});

router.get('/topsecret', (req, res) => {
  res.send('탑시크릿')
})

router.get('/deleteeverything', (req, res) => {
  res.send('다 삭제')
})

module.exports = router;
