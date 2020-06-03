import React from 'react';
import { Row, Col, Card } from 'antd';

import SkeletonLayout from './skeletonLayout';

const path = 'http://localhost:5000/';

const ProductList = ({ data, loading }) => {
  console.log(data);
  if (loading) return <SkeletonLayout />;
  if (data.products.items.length === 0) return <h1>No data found</h1>;
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
