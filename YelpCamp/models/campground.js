const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema; // 추후에 mongoose.Schema.~~ 를 많이 쓰니까 미리 정의해둠

// 몽고DB에 새 Schema 생성
const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

module.exports = mongoose.model('Campground', CampgroundSchema);
