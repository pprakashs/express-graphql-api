import React, { useContext, useEffect } from 'react';

import { Layout, Button, Typography, Drawer } from 'antd';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
const { Content } = Layout;

import AddProductForm from './../components/product/addProduct';
import ProductList from './../components/product/productList';

import { ProductContext } from './../context/productContext';

const Product = () => {
  const [state, dispatch] = useContext(ProductContext);

  return (
    <Content className="content-layout">
      <header className="page-top-block--header">
        <Typography.Title level={4}>Product</Typography.Title>
        <Button type="primary" className="button large" size="large" onClick={() => dispatch({ type: 'ADD_PRODUCT' })}>
          <PlusOutlined /> Add Product
        </Button>
      </header>
      <Drawer
        title="Add Product"
        placement="right"
        closable={true}
        onClose={() => dispatch({ type: 'CLOSE_DRAWER' })}
        visible={state.showDrawer}
        className="drawer-block"
      >
        <button type="button" className="btn back-arrow" onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}>
          <LeftOutlined />
        </button>
        <AddProductForm />
      </Drawer>
      <ProductList />
    </Content>
  );
};

export default Product;
