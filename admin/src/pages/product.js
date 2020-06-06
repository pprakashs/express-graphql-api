import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Layout, Button, Typography, Drawer } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
const { Content } = Layout;

import AddProductForm from './../components/product/addProduct';
import ProductList from './../components/product/productList';
import { PRODUCT_LIST } from './../helpers/query';
import ProductContext from '../components/product/ProductContext';

const Product = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [products, setProduct] = useState([]);

  const { loading, error, data } = useQuery(PRODUCT_LIST);
  useEffect(() => {
    !loading ? setProduct(data.products.items) : null;
  }, [data]);
  return (
    <Content className="content-layout">
      <header className="page-top-block--header">
        <Typography.Title level={4}>Product</Typography.Title>
        <Button type="primary" className="button large" size="large" onClick={() => setShowDrawer(true)}>
          Add Product
        </Button>
      </header>
      <ProductContext.Provider value={{ loading, products, setProduct }}>
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
        <ProductList data={data} />
      </ProductContext.Provider>
    </Content>
  );
};

export default Product;
