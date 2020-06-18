import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout as Container } from 'antd';

import { AuthProvider } from './context/auth';
import client from './graphql/client';
import { AuthRoute } from './util/authRoute';

import Login from './pages/login';

import Layout from './components/layout';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Container>
        <AuthProvider>
          <Router>
            <AuthRoute exact path="/login" component={Login} />

            <Layout />
          </Router>
        </AuthProvider>
      </Container>
    </ApolloProvider>
  );
};

export default App;
