import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import ApolloClient from 'apollo-client';
import store from './store';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:5000/graphql',
  }),
  resolvers: {},
  cache,
  assumeImmutableResults: true,
});

cache.writeData({
  data: store,
});

export default client;
