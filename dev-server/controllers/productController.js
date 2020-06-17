import { createWriteStream } from 'fs';
import sharp from 'sharp';
import Product from '../models/productModel';

//file upload
const fileUpload = async (image) => {
  const { createReadStream, filename, mimetype } = await image;

  //getting file stream
  const stream = createReadStream();

  //creating file name
  const id = Date.now();
  const fName = `${id}-${filename}`;
  const path = `${process.env.UPLOAD_DIR}/${fName}`;

  //checking if upload file image or not
  if (!mimetype.startsWith('image')) {
    throw new Error('please only upload image!');
  }

  const transform = sharp().resize(1000);

  //uploading file to upload directory
  return new Promise((resolve, rejects) => {
    stream
      .pipe(transform)
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ fName }))
      .on('error', rejects);
  });
};

// checking authorization
const authorization = (req, cb) => {
  const {
    isAuthorization: { status, message, user },
  } = req;
  if (!status) {
    throw new Error(message);
  }
  //callback
  cb(user);
};

// restrict callback
const restrictTo = (user) => {
  //perform if user is admin
  if (user.role !== 'admin') {
    throw new Error('you do not have permission to perform this action');
  }
};

export const createProduct = async ({ image, ...input }, req) => {
  //user authorization and checking is admin or not
  //authorization(req, restrictTo);
  // if there is image
  if (image) {
    //const { fName } = await fileUpload(image);
    const { fName } = await fileUpload(image);

    input.imagePath = process.env.UPLOAD_DIR;
    input.image = fName;
  }
  //Create new product
  const newProduct = await Product.create(input);

  //response object
  const responseProduct = await Product.findById(newProduct._id).populate({
    path: 'category',
    select: '-__v',
  });

  return responseProduct;
};

export const getProduct = async (args) => {
  return await Product.findById({ _id: args.id });
};

export const getProducts = async () => {
  const allProducts = await Product.find({}).sort({ createdAt: -1 }).populate('category');

  return {
    result: allProducts.length,
    items: allProducts,
  };
};

export const updateProduct = async (id, { image, ...input }, req) => {
  //user authorization and checking is admin or not
  // authorization(req, restrictTo);

  if (image) {
    //const { fName } = await fileUpload(image);
    const { fName } = await fileUpload(image);

    input.imagePath = process.env.UPLOAD_DIR;
    input.image = fName;
  }
  const doc = await Product.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  }).populate({
    path: 'category',
    select: '-__v',
  });

  if (!doc) {
    throw new Error('No document found with this ID');
  }

  return doc;
};

export const deleteOne = async (id, req) => {
  //user authorization and checking is admin or not
  //authorization(req, restrictTo);

  // const doc = await Product.findByIdAndDelete(id);

  // if (!doc) {
  //   throw new Error('No document found with this ID');
  // }

  return {
    status: 'success',
    message: `Category related to ${id} has been deleted`,
    id: id,
  };
};
