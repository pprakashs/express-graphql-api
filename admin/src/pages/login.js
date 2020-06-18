import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Layout, Form, Input, Button, Alert, Row, Col, Typography, Space } from 'antd';
import { LOGIN } from './../graphql/queries';
import { AuthContext } from './../context/auth';

const { Content } = Layout;

const Login = (props) => {
  const [userLogin, { error }] = useMutation(LOGIN);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const context = useContext(AuthContext);

  const loginHandle = async (inputData) => {
    try {
      setLoading(true);
      userLogin({
        variables: inputData,
        update(_, { data: { login: userData } }) {
          setLoading(false);
          context.login(userData);
          history.push('/');
        },
      });
    } catch (err) {
      console.log(err.graphQLErrors[0]);
      setLoading(false);
    }
  };

  return (
    <Row justify={'center'} align="middle" className="full-height user-form">
      <Col span={8}>
        <div className="user-form__inner">
          <div className="logo text-center">
            My <span>Style</span>
          </div>
          <Typography.Title level={4} className="text-center">
            Log in to admin
          </Typography.Title>
          <Form layout="vertical" size="large" onFinish={loginHandle} form={form} layout="vertical">
            <Form.Item name="email" rules={[{ required: true, message: 'email is Required!' }]}>
              <Input type="email" placeholder="email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Password is Required!' }]}>
              <Input.Password placeholder="password" />
            </Form.Item>
            {error && (
              <Alert className="error-box" message="Error" type="error" description={error.graphQLErrors[0].message} type="error" showIcon closable />
            )}
            <Button block={true} type="primary" htmlType="submit" className="button large" size="large" loading={loading}>
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
