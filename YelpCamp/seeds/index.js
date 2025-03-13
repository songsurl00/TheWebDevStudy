// node앱과는 별개로 DB 초기화하고 새로 생성하는 파일

const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

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

// 배열에 접근하기 위한 함수 (배열을 받고 배열의 랜덤한 위치에 접근)
const sample = arr => arr[Math.floor(Math.random() * arr.length)];

// 50개의 랜덤한 새 캠프 생성 함수
const seedDB = async () => {
  await Campground.deleteMany({}); // 기존 DB 날리기
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`
    });
    await camp.save();
  }
};

seedDB()
  .then(() => {
    mongoose.connection.close(); // 몽고DB 연결 끊기
  })
  .catch(err => {
    console.log('캠프 생성 실패');
    console.log(err);
  });
