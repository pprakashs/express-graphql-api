import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout as Container } from 'antd';

import { AuthProvider } from './context/auth';
import client from './graphql/client';

import Layout from './pages/index';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Container>
        <AuthProvider>
          <Router>
            <Layout />
          </Router>
        </AuthProvider>
      </Container>
    </ApolloProvider>
  );
};

export default App;
