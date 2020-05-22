import React from 'react';
import { Row, Col, Card, Skeleton } from 'antd';

const SkeletonLayout = () => {
    const number = [1, 2, 3];
    return (
        <Row gutter={20}>
            {number.map((el, index) => (
                <Col key={index} span={6}>
                    <Card className="product-item">
                        <Skeleton active loading={true}>

                        </Skeleton>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default SkeletonLayout;