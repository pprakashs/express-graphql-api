import React from 'react';
import { useLocation } from 'react-router-dom';

import { RestrictTo } from './../util/authRoute';
import { ProductProvider } from './../context/productContext';
import Header from './header/';
import Navigation from './navigation';
import Product from './../pages/product';
import Category from './../pages/category';

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== '/login' && (
        <>
          <Header />
          <Navigation />
        </>
      )}
      <ProductProvider>
        <RestrictTo exact path="/" component={Product} />
      </ProductProvider>

      <RestrictTo exact path="/category" component={Category} />
    </>
  );
};

export default Layout;
