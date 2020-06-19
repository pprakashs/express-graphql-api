import React from 'react';
import { Result, Button } from 'antd';

import { Layout } from 'antd';
const { Content } = Layout;
const NotFoundPage = () => {
  return (
    <Content className="content-layout category-page">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button href="/" type="primary">
            Back Home
          </Button>
        }
      />
    </Content>
  );
};
export default NotFoundPage;
