import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const PRODUCT_LIST = gql`
  {
    products {
      items {
        id
        title
        price
        image
        imagePath
        category {
          id
          name
          slug
        }
      }
    }
  }
`;

import ProductList from './../components/productList';

const Product = () => {
  const { loading, error, data } = useQuery(PRODUCT_LIST);
  return (
    <Content className="content-layout">
      <ProductList data={data} loading={loading} />
    </Content>
  );
};

export default Product;
