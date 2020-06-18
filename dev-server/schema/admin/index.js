import { ApolloServer } from 'apollo-server-express';
import { authorization } from '../../controllers/auth';

import typeDefs from './typedefs';
import resolvers from './resolvers';

let graphqlDev;
if (process.env.NODE_ENV === 'development') {
  graphqlDev = 'graphql';
} else {
  graphqlDev = false;
}

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  playground: graphqlDev,
  context: async ({ req, res }) => {
    req.isAuthorization = await authorization(req);
    return {
      req,
      res,
    };
  },
  formatError(err) {
    if (!err.originalError) {
      return err;
    }
    return {
      message: err.message,
      data: err.originalError.data,
    };
  },
});

export default schema;
