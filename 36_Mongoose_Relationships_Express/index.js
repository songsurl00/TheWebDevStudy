const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');
const Farm = require('./models/farm');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStandTake2');
}

main()
  .then(() => {
    console.log('몽고DB 연결');
  })
  .catch(err => {
    console.log('몽고DB 연결 에러');

    console.log(err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// FARM ROUTES

app.get('/farms', async (req, res) => {
  const farms = await Farm.find({});
  res.render('farms/index', { farms });
});

app.get('/farms/new', (req, res) => {
  res.render('farms/new');
});

app.post('/farms', async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect('/farms');
});

app.get('/farms/:id', async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate('products')
  res.render('farms/show', { farm });
});

app.get('/farms/:id/products/new', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);  
  res.render('products/new', { categories, farm });
});

app.post('/farms/:id/products', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);  
  const { name, price, category } = req.body;
  const product = new Product({ name, price, category });
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect(`/farms/${id}`)
});

app.delete('/farms/:id', async (req, res) => {
  const farm = await Farm.findByIdAndDelete(req.params.id);
  
  res.redirect('/farms')
})

// PRODUCTS ROUTES

const categories = ['fruit', 'vegetable', 'dairy'];

// 기본 페이지
app.get('/products', async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category: category });
    res.render('products/index', { products, category });
  } else {
    const products = await Product.find({});
    res.render('products/index', { products, category: 'All' });
  }
});

// 새 프로덕트 생성 페이지
app.get('/products/new', (req, res) => {
  res.render('products/new', { categories });
});

// 새 프로젝트 POST
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

// 프로덕트 상세 페이지
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('farm', 'name');
  res.render('products/detail', { product });
});

// 프로덕트 업데이트 페이지
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
});

// 프로덕트 업데이트 PUT
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  res.redirect(`/products/${product._id}`);
});

// 프로덕트 삭제
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

app.listen(3000, () => {
  console.log('3000번 포트 연결');
});
