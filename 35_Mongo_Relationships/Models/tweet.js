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

const userSchema = new Schema({
  username: String,
  age: Number
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//   // const user = new User({ username: 'colt99', age: 61 });
//   const user = await User.findOne({username: 'colt99'})
//   const tweet2 = new Tweet({ text: 'OTL', likes: 1242 });
//   tweet2.user = user;
//   user.save();
//   tweet2.save();
// };

// makeTweets();

const findTweet = async () => {
  const t = await Tweet.find({}).populate('user');
  console.log(t);
};

findTweet();
