const mongoose = require('mongoose');
const Product = require('./models/product');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fleshDemo');
}

main()
  .then(() => {
    console.log('몽고DB 연결');
  })
  .catch(err => {
    console.log('몽고DB 연결 에러');

    console.log(err);
  });

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const seedProducts = [
  {
    name: 'Fairy Eggplant',
    price: 1.0,
    category: 'vegetable'
  },
  {
    name: 'Organic Goddess Melon',
    price: 4.99,
    category: 'fruit'
  },
  {
    name: 'Organic Mini Seedless Watermelon',
    price: 3.99,
    category: 'fruit'
  },
  {
    name: 'Organic Celery',
    price: 1.5,
    category: 'vegetable'
  },
  {
    name: 'Chocolate Whole Milk',
    price: 2.69,
    category: 'dairy'
  }
];

Product.insertMany(seedProducts)
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  });
