import React from 'react';
import { Row, Col, Card } from 'antd';

import SkeletonLayout from './skeletonLayout';


const ProductList = ({ data, loading }) => {

    if (loading) return <SkeletonLayout />

    return (
        <Row gutter={20}>
            {data.products.items.map((el, index) => (
                <Col key={index} span={6}>
                    <Card className="product-item">
                        <a href="#">
                            <figure className="thumb">
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
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
    )
}

export default ProductList;