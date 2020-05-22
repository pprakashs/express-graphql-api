import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  slug: String,
  description: String,
  category: [],
  price: Number,
  image: String,
  imagePath: String,
});

productSchema.pre('save', function (next) {
  const titleArray = this.name.split(' ').map((el) => {
    return el.replace('&', 'and');
  });
  this.slug = titleArray.join('-').toLowerCase();
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
