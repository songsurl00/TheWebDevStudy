const mongoose = require('mongoose');
const { Schema } = mongoose;

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDB');
}

main()
  .then(() => {
    console.log('몽고DB 연결');
  })
  .catch(err => {
    console.log('몽고DB 연결 에러');
    console.log(err);
  });

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ['Spring', 'Summer', 'Fall', 'Winter']
  }
});

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//   { name: 'Goddess Melon', price: 4.99, season: 'Summer' },
//   { name: 'Sugat Baby Watermelon', price: 4.99, season: 'Summer' },
//   { name: 'Melon', price: 3.99, season: 'Spring' }
// ]);

const makeFarm = async () => {
  const farm = new Farm({ name: 'farm', city: 'CA' });
  const melon = await Product.findOne({ name: 'Goddess Melon' });
  farm.products.push(melon)
  await farm.save()
  console.log(farm);
};

// makeFarm();

const addProduct = async () => {
  const farm = await Farm.findOne({ name: 'farm' });
  const watermelon = await Product.findOne({ name: 'Sugat Baby Watermelon' });
  farm.products.push(watermelon);
  await farm.save();
  console.log(farm);
};

// addProduct();

Farm.findOne({ name: 'farm' })
  .populate('products')
  .then(farm => console.log(farm));
