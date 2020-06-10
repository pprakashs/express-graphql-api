import React, { useState, useContext } from 'react';
import { Row, Col, Card, Empty, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/react-hooks';
import SkeletonLayout from './../skeletonLayout';
import { PRODUCT_LIST, LOCAL_STATE_PRODUCTS, DELETE_PRODUCT } from './../../graphql/queries';

import { ProductContext } from './../../pages/product';

const path = 'http://localhost:5000/';

const ProductList = () => {
  const [buttonState, setButtonState] = useState(null);
  const { loading, error, data, client } = useQuery(PRODUCT_LIST);
  const [showDrawer, setShowDrawer] = useContext(ProductContext);
  console.log(showDrawer);

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const {
    data: {
      allProduct: { items: products },
    },
  } = useQuery(LOCAL_STATE_PRODUCTS);

  if (!loading) {
    client.writeData({
      data: {
        allProduct: {
          items: data.products.items,
          __typename: 'Item',
        },
        __typename: 'Product',
      },
    });
  }

  const handleDelete = async (id) => {
    setButtonState(id);

    await deleteProduct({
      variables: { id: id },
    });

    client.writeData({
      data: {
        products: {
          items: products.filter((p) => p.id !== id),
          __typename: 'Item',
        },
        __typename: 'Product',
      },
    });
  };

  if (loading) return <SkeletonLayout />;

  if (products.length === 0)
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description="No Product Found!"
        style={{ backgroundColor: '#fff', padding: '50px 0' }}
      >
        <Button type="primary" className="button large" size="large" onClick={() => setShowDrawer(!showDrawer)}>
          <PlusOutlined /> Add Product
        </Button>
      </Empty>
    );

  return (
    <Row gutter={20}>
      {products.map((el, index) => (
        <Col key={index} span={6}>
          <Card className="product-item">
            <figure className="thumb">
              <img alt="example" src={`${path}${el.imagePath}/${el.image}`} />
            </figure>

            <div className="card-body">
              <h3>{el.title}</h3>
              <div className="price">{el.price}</div>
            </div>
            <div className="product-item__popup">
              <Button loading={buttonState === el.id ? true : false} type="primary" danger onClick={() => handleDelete(el.id)}>
                Delete
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
