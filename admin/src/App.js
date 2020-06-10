import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout } from 'antd';

import Header from './components/header/';
import Navigation from './components/navigation';
import Product from './pages/product';
import Category from './pages/category';

import client from './graphql/client';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Layout>
          <Router>
            <Header />
            <Navigation />
            <Switch>
              <Route exact path="/">
                <Product />
              </Route>
              <Route path="/category">
                <Category />
              </Route>
            </Switch>
          </Router>
        </Layout>
      </ApolloProvider>
    );
  }
}

export default App;
