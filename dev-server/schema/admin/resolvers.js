import { signup, login } from '../../controllers/auth';
import { createProduct, getProduct, getProducts, updateProduct, deleteOne } from '../../controllers/productController';

import categoryCtrl from './../../controllers/categoryController';

const resolvers = {
  Query: {
    getProduct: async (root, args) => {
      return await getProduct(args);
    },
    products: async () => {
      return await getProducts();
    },

    //FOR CATEGORY
    category: async () => {
      return await categoryCtrl.getAllCategory();
    },
  },
  Mutation: {
    signup: async (root, args) => {
      return await signup(args);
    },
    login: async (root, { input }, { req, res }) => {
      return await login(input, res);
    },

    //FOR PRODUCT
    addProduct: async (root, { input }, { req }) => {
      return await createProduct(input, req);
    },
    updateProduct: async (root, { id, input }, { req }) => {
      return await updateProduct(id, input, req);
    },
    deleteProduct: async (root, { id }, { req }) => {
      return await deleteOne(id, req);
    },

    //FOR CATEGORY
    addCategory: async (root, args, { req }) => {
      return await categoryCtrl.addCategory(args, req);
    },
    deleteCategory: async (root, { id }, { req }) => {
      return await categoryCtrl.deleteCategory(id, req);
    },
    updateCategory: async (root, { id, name }, { req }) => {
      return await categoryCtrl.updateCategory(id, name);
    },
  },
};

export default resolvers;
