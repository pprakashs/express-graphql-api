import React, { useContext } from 'react';
import { Row, Col, Card, Empty, Button } from 'antd';

import SkeletonLayout from './../skeletonLayout';
import ProductContext from './ProductContext';

const path = 'http://localhost:5000/';

const ProductList = ({ data }) => {
  const { loading, products } = useContext(ProductContext);
  console.log(products);
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
        <Button type="primary">Create Now</Button>
      </Empty>
    );
  return (
    <Row gutter={20}>
      {data.products.items.map((el, index) => (
        <Col key={index} span={6}>
          <Card className="product-item">
            <a href="#" data-id={el.id}>
              <figure className="thumb">
                <img alt="example" src={`${path}${el.imagePath}/${el.image}`} />
              </figure>

              <div className="card-body">
                <h3>{el.title}</h3>
                <div className="price">{el.price}</div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
