import Category from './../models/categoryModel';

const categoryCtrl = {
  addCategory: async (args, req) => {
    return Category.create(args);
  },
};

export default categoryCtrl;
