import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  slug: String,
  description: String,
  category: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
  ],
  price: Number,
  image: String,
  imagePath: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre('save', function (next) {
  //replacing all the & to and
  const titleArray = this.title.split(' ').map((el) => {
    return el.replace('&', 'and');
  });
  this.slug = titleArray.join('-').toLowerCase();
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
