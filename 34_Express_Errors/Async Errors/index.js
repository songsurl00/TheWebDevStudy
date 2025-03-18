const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError');

const Product = require('./models/product');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand2');
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

const categories = ['fruit', 'vegetable', 'dairy'];

// 기본 페이지
app.get(
  '/products',
  wrapAsync(async (req, res, next) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category: category });
      res.render('products/index', { products, category });
    } else {
      const products = await Product.find({});
      res.render('products/index', { products, category: 'All' });
    }
  })
);

// 새 프로덕트 생성 페이지
app.get('/products/new', (req, res) => {
  res.render('products/new', { categories });
});

// 새 프로젝트 POST
app.post(
  '/products',
  wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  })
);

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(e => next(e));
  };
}

// 프로덕트 상세 페이지
app.get(
  '/products/:id',
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError('Product Not Found', 404);
    }
    res.render('products/detail', { product });
  })
);

// 프로덕트 업데이트 페이지
app.get(
  '/products/:id/edit',
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError('Product Not Found', 404);
    }
    res.render('products/edit', { product, categories });
  })
);

// 프로덕트 업데이트 PUT
app.put(
  '/products/:id',
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
  })
);

// 프로덕트 삭제
app.delete(
  '/products/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
  })
);

const handleValidationErr = err => {
  console.dir(err);
  return new AppError(`Validation Failed...${err.message}`, 400);
};

app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === 'ValidationError') err = handleValidationErr(err);
  next(err);
});

app.use((err, req, res, next) => {
  const { status = 500, message = '뭔가 잘못됨' } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log('3000번 포트 연결');
});
