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
    deleteProduct: async (root, { id }, { req }) => {
      return await deleteOne(id, req);
    },
    //FOR CATEGORY
    category: async () => {
      return await categoryCtrl.getAllCategory();
    },

    deleteCategory: async (root, { id }, { req }) => {
      return await categoryCtrl.deleteCategory(id, req);
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
    editProduct: async (root, { id, input }, { req }) => {
      return await updateProduct(id, input, req);
    },

    //FOR CATEGORY
    addCategory: async (root, args, { req }) => {
      return await categoryCtrl.addCategory(args, req);
    },
  },
};

export default resolvers;
