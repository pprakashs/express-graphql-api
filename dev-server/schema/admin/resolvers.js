import { signup, login } from '../../controllers/auth';
import { createProduct, getProduct, getProducts, updateProduct, deleteOne } from '../../controllers/productController';
import userCtrl from './../../controllers/userController';
import categoryCtrl from './../../controllers/categoryController';

const resolvers = {
  Query: {
    me: (__, args, { req, res }) => {
      return userCtrl.getMe(req);
    },
    getProduct: (root, args) => {
      return getProduct(args);
    },
    products: () => {
      return getProducts();
    },

    //FOR CATEGORY
    category: () => {
      return categoryCtrl.getAllCategory();
    },
  },
  Mutation: {
    signup: (root, args) => {
      return signup(args);
    },
    login: (root, args, { req, res }) => {
      return login(args, res);
    },

    //FOR PRODUCT
    addProduct: (root, { input }, { req }) => {
      return createProduct(input, req);
    },
    updateProduct: (root, { id, input }, { req }) => {
      return updateProduct(id, input, req);
    },
    deleteProduct: (root, { id }, { req }) => {
      return deleteOne(id, req);
    },

    //FOR CATEGORY
    addCategory: (_, { req }) => {
      return categoryCtrl.addCategory(args, req);
    },
    deleteCategory: (_, { id }, { req }) => {
      return categoryCtrl.deleteCategory(id, req);
    },
    updateCategory: (_, { id, name }, { req }) => {
      return categoryCtrl.updateCategory(id, name);
    },
  },
};

export default resolvers;
