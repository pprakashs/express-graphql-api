import Category from './../models/categoryModel';

const categoryCtrl = {
  addCategory: async (args, req) => {
    return await Category.create(args);
  },
  getAllCategory: async () => {
    const allCategory = await Category.find({});
    return {
      result: allCategory.length,
      items: allCategory,
    };
  },

  deleteCategory: async (id, req) => {
    const doc = await Category.findByIdAndDelete(id);

    if (!doc) {
      throw new Error('No Category found with this ID');
    }

    return {
      status: 'success',
      message: `Category related to ${id} has been deleted`,
    };
  },
};

export default categoryCtrl;
