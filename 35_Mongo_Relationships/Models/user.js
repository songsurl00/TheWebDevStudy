const mongoose = require('mongoose');

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

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { _id: false },
      street: String,
      city: String,
      state: String,
      country: String
    }
  ]
});

const User = new mongoose.model('User', userSchema);

const makeUser = async () => {
  const u = new User({
    first: 'Harry',
    last: 'Potter'
  });
  u.addresses.push({
    street: '123 Sesame St.',
    city: 'New York',
    state: 'NY',
    country: 'USA'
  });
  const res = await u.save();
  console.log(res);
};

const addAddress = async id => {
  const user = await User.findById(id);
  user.addresses.push({
    street: '99 erd St.',
    city: 'New York',
    state: 'NY',
    country: 'USA'
  });
  const res = await user.save();
  console.log(res);
};

// makeUser();
addAddress('67db9ca5edf09ce71a322f11');
