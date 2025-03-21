const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('모든 Dog')
})

router.get('/:id', (req, res) => {
  res.send('Dog 상세보기')
})

router.get('/:id/edit', (req, res) => {
  res.send('Dog 수정')
})

module.exports = router;
