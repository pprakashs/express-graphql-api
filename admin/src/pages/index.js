import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { RestrictTo } from './../util/authRoute';
import { ProductProvider } from './../context/productContext';
import { AuthContext } from './../context/auth';
import { AuthRoute } from './../util/authRoute';

import Header from './../components/header';
import Navigation from './../components/navigation';

import Login from './login';
import Product from './product';
import Category from './category';
import NotFoundPage from './404';

const Layout = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && (
        <>
          <Header />
          <Navigation />
        </>
      )}
      <ProductProvider>
        <Switch>
          <AuthRoute exact path="/login" component={Login} />

          <RestrictTo exact exact path="/" component={Product} />

          <RestrictTo exact path="/category" component={Category} />
          <RestrictTo exact path="*" component={NotFoundPage} />
        </Switch>
      </ProductProvider>
    </>
  );
};

export default Layout;
