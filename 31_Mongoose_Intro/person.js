const mongoose = require('mongoose');

main()
  .then(() => {
    console.log('CONNECTION OPEN!!!');
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}

const personSchema = new mongoose.Schema({
  first: String,
  last: String
});

personSchema.virtual('fullName').get(function () {
  return `${this.first} ${this.last}`;
});

personSchema.pre('save', async function (params) {
  this.first = '요';
  this.last = '마마';
  console.log('pre 세이브');
});

personSchema.post('save', async function (params) {
  console.log('그냥 세이브');
});

const Person = mongoose.model('Person', personSchema);
