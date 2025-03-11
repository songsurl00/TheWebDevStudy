const mongoose = require('mongoose');

main()
  .then(() => {
    console.log('CONNECTION OPEN!!!');
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  price: {
    type: Number,
    required: true,
    min: [0, '가격은 반드시 양수여야 합니다']
  },
  onSale: {
    type: Boolean,
    default: false
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0
    },
    inStore: {
      type: Number,
      default: 0
    }
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L']
  }
});

// productSchema.methods.greet = function () {
//   console.log('메서드야 안녕');
//   console.log(`- from ${this.name}`);
// };

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};

productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 0 });
};

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: '바이크 헬멧' });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCategory('아웃도어');
  console.log(foundProduct);
};

Product.fireSale().then(res => console.log(res));

// findProduct();

// const bike = new Product({ name: '바이크 점퍼', price: 28.5, categories: ['사이클링'], size: 'XS' });
// bike
//   .save()
//   .then(data => {
//     console.log('성공');
//     console.log(data);
//   })
//   .catch(err => {
//     console.log('에러');
//     console.log(err);
//   });

// Product.findOneAndUpdate({ name: '타이어 펌프' }, { price: -10.99 }, { new: true, runValidators: true })
//   .then(data => {
//     console.log('성공');
//     console.log(data);
//   })
//   .catch(err => {
//     console.log('에러');
//     console.log(err);
//   });
