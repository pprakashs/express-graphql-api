import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import schema from './schema/admin';

const app = express();

app.use('/uploads', express.static(path.resolve('./uploads')));

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res, next) => {
  res.send('GraphQL API');
});

//define path
const adminPath = '/admin/graphql';
const shopPath = '/shop/graphql';

//applying middleware to schema
schema.applyMiddleware({ app });
// schema.applyMiddleware({ app, path: shopPath });

export default app;
