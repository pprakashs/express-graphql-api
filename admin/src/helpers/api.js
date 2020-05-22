import { InMemoryCache } from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client'
import ApolloClient from "apollo-client";

const client = new ApolloClient({
    link: createUploadLink({
        uri: 'http://localhost:5000/graphql'
    }),
    cache: new InMemoryCache({
        addTypename: false
    })
});

export default client;