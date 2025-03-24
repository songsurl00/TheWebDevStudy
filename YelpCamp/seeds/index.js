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

const accessToken = '63OSlkJViIYeJ5ZBS1-rWvHNoW5JO0fhF14OS7WDGc0';

// 50개의 랜덤한 새 캠프 생성 함수
const seedDB = async () => {
  await Campground.deleteMany({}); // 기존 DB 날리기
  // console.log(imgs.urls.raw)
  for (let i = 0; i < 45; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const imgs = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessToken}`).then(res => res.json());
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '67e11d1b3fc268a32a05a6bd',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: imgs.urls.raw,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio enim, quis reiciendis dolores obcaecati, at error quibusdam veritatis dolorum aliquam nostrum cupiditate. Possimus praesentium a distinctio esse eos perspiciatis recusandae!',
      price
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
