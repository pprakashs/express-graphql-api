import React, { useState, useContext } from 'react';
import { Row, Col, Card, Empty, Button, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/react-hooks';
import SkeletonLayout from './../skeletonLayout';
import { PRODUCT_LIST, DELETE_PRODUCT } from './../../graphql/queries';

import { ProductContext } from './../../context/productContext';

const path = 'http://api.pprakash.com:5000/';

const openNotificationWithIcon = (type, description, message) => {
  notification[type]({
    message: message,
    description,
    duration: 3,
  });
};

const ProductList = () => {
  const [state, dispatch] = useContext(ProductContext);
  const [id, setId] = useState(null);

  const { loading, data } = useQuery(PRODUCT_LIST);

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleDelete = async (id) => {
    try {
      setId(id);
      await deleteProduct({
        variables: { id },
        update: (client, result) => {
          const allProduct = client.readQuery({
            query: PRODUCT_LIST,
          });

          allProduct.products.items = allProduct.products.items.filter((p) => p.id !== id);
          client.writeQuery({
            query: PRODUCT_LIST,
            data: allProduct,
          });
        },
      });
    } catch (err) {
      setId(null);
      console.log(err.graphQLErrors[0]);
      openNotificationWithIcon('error', err.graphQLErrors[0].message, '403');
    }
  };

  const handleEdit = (id) => {
    const product = data.products.items.filter((p) => p.id === id);
    state.product = product;
    dispatch({ type: 'UPDATE_PRODUCT' });
  };

  if (loading) return <SkeletonLayout />;

  if (data.products.items.length === 0)
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description="No Product Found!"
        style={{ backgroundColor: '#fff', padding: '50px 0' }}
      >
        <Button type="primary" className="button large" size="large" onClick={() => dispatch({ type: 'ADD_PRODUCT' })}>
          <PlusOutlined /> Add Product
        </Button>
      </Empty>
    );

  return (
    <Row gutter={20}>
      {data.products.items.map((el, index) => (
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
              <Button loading={id === el.id ? true : false} type="primary" danger onClick={() => handleDelete(el.id)}>
                Delete
              </Button>

              <Button type="primary" onClick={() => handleEdit(el.id)}>
                Edit
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
