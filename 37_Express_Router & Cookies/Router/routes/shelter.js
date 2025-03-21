const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('모든 쉘터')
})

router.post('/', (req, res) => {
  res.send('쉘터 추가')
})

router.get('/:id', (req, res) => {
  res.send('쉘터 상세보기')
})

router.get('/:id/edit', (req, res) => {
  res.send('쉘터 수정')
})

module.exports = router;
