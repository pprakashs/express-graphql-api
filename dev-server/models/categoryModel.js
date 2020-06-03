import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
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

categorySchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('The name already been in used! try with new name'));
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
