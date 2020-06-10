import React, { createContext, useContext, useState } from 'react';

import { Layout, Button, Typography, Drawer } from 'antd';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
const { Content } = Layout;

import AddProductForm from './../components/product/addProduct';
import ProductList from './../components/product/productList';

export const ProductContext = createContext(null);

const Product = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <Content className="content-layout">
      <ProductContext.Provider value={[showDrawer, setShowDrawer]}>
        <header className="page-top-block--header">
          <Typography.Title level={4}>Product</Typography.Title>
          <Button type="primary" className="button large" size="large" onClick={() => setShowDrawer(true)}>
            <PlusOutlined /> Add Product
          </Button>
        </header>
        <Drawer
          title="Add Product"
          placement="right"
          closable={true}
          onClose={() => setShowDrawer(false)}
          visible={showDrawer}
          className="drawer-block"
        >
          <button type="button" className="btn back-arrow" onClick={() => setShowDrawer(false)}>
            <LeftOutlined />
          </button>
          <AddProductForm cancel={() => setShowDrawer(false)} />
        </Drawer>
        <ProductList />
      </ProductContext.Provider>
    </Content>
  );
};

export default Product;
