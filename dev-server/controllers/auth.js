import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const signToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    algorithm: 'HS512',
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

export const authorization = async (req) => {
  const {
    headers: { authorization },
    cookies: { myclothing_login },
  } = req;

  let token;

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  } else if (myclothing_login) {
    token = myclothing_login;
  }

  if (!token) {
    return (req.isAuthorization = {
      status: false,
      message: 'Your are not logged in! please logged in to get access',
    });
  }

  //verify jwt token
  const decode = await jwt.verify(token, process.env.JWT_SECRET);

  //checking the token
  if (!decode) {
    return (req.isAuthorization = {
      status: false,
      message: 'Your are not logged in! please logged in to get access',
    });
  }

  //getting current user from token
  const currentUser = await User.findOne({ email: decode.user }).select('-__v');

  // checking if current user exist or not
  if (!currentUser) {
    return (req.isAuthorization = {
      status: false,
      message: 'The user belonging with the token does not exists.',
    });
  }

  return (req.isAuthorization = {
    status: true,
    user: currentUser,
  });
};

export const signup = async (args) => {
  if (!args) {
    throw new Error('Please provide valid Info!');
  }
  const newUser = await User.create(args);

  newUser.status = 'success';
  newUser.message = 'User has be created successfully';

  return newUser;
};

export const login = async (args, res) => {
  const { email, password } = args;

  //email or password empty
  if (!email || !password) {
    throw new Error('Please provide email and password');
  }

  //finding the user by email
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('User does not find  with this email! please register');
  }

  //getting correct password from hash password
  const correctPassword = await user.correctPassword(password, user.password);

  //checking user and password
  if (!user || !correctPassword) {
    throw new Error('Incorrect user or password!');
  }

  //cookies option
  const cookiesOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  process.env.NODE_ENV === 'production' ? (cookiesOption.secure = true) : null;

  //generate token
  const token = signToken(user.email);

  //creating cookies
  res.cookie('myclothing_login', token, cookiesOption);

  // user.status = 'success';
  // user.token = token;
  // user.user = user;

  return {
    token,
    user,
  };
};

// checking authorization
export const checkAuth = (req, cb) => {
  const {
    isAuthorization: { status, message, user },
  } = req;
  if (!status) {
    throw new Error(message);
  }
  //callback
  if (cb) {
    return cb(user);
  }

  return user;
};

// restrict callback
export const restrictTo = (user) => {
  //perform if user is admin
  if (user.role !== 'admin') {
    throw new Error('you do not have permission to perform this action');
  }
};
