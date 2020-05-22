import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: ['true', 'Category name is required!'],
  },
  slug: String,
});

categorySchema.pre('save', function (next) {
  //replacing all the & to and
  const titleArray = this.name.split(' ').map((el) => {
    return el.replace('&', 'and');
  });
  this.slug = titleArray.join('-').toLowerCase();
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
