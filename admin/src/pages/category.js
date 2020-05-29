import React, { Component } from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { Layout, Button, Drawer, Typography, Form, Input, Table, notification } from 'antd';
import { PlusOutlined, LeftOutlined } from '@ant-design/icons';
const { Content } = Layout;

const openNotificationWithIcon = (type, name) => {
  notification[type]({
    message: 'Created',
    description: `${name} has been created`,
    duration: 1.5,
  });
};

const ADD_CATEGORY = gql`
  mutation($name: String!) {
    addCategory(name: $name) {
      name
    }
  }
`;

const columns = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Slug',
    key: 'slug',
  },
  {
    title: 'Post Count',
    key: 'postCount',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

class Category extends Component {
  constructor() {
    super();
    this.submitHandle = this.submitHandle.bind(this);
  }
  state = { visible: false, name: null };

  // async componentDidMount() {
  //   const { data } = await this.props.client.query({query: ADD_CATEGORY});
  //   console.log(data);
  // }

  showDrawer() {
    this.setState({
      visible: true,
    });
  }

  onClose() {
    this.setState({
      visible: false,
    });
  }

  async submitHandle() {
    try {
      const { data } = await this.props.client.mutate({
        mutation: ADD_CATEGORY,
        variables: {
          name: this.state.name,
        },
      });
      openNotificationWithIcon('success', data.addCategory.name);
      this.setState({
        name: null,
      });
    } catch (error) {}
  }
  inputHandle(e) {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    return (
      <Content className="content-layout category-page">
        <header className="category-page--header">
          <Typography.Title level={4}>Category</Typography.Title>
          <Button type="primary" onClick={this.showDrawer.bind(this)} className="button large" size="large">
            <PlusOutlined /> Add Category
          </Button>
        </header>

        <Drawer
          title="Add Category"
          placement="right"
          closable={true}
          onClose={this.onClose.bind(this)}
          visible={this.state.visible}
          className="drawer-block"
        >
          <button type="button" className="btn back-arrow" onClick={this.onClose.bind(this)}>
            <LeftOutlined />
          </button>

          <Form onFinish={this.submitHandle} layout="vertical" size="large">
            <Form.Item
              label="Category Name"
              // rules={[{ required: true, message: 'Category title is required' }]}
              name="name"
            >
              <Input onChange={this.inputHandle.bind(this)} name="name" value={this.state.name} />
            </Form.Item>

            <footer className="ant-drawer-footer">
              <Button onClick={this.onClose.bind(this)} block={true} type="link" danger>
                Cancel
              </Button>
              <Button block={true} type="primary" htmlType="submit" className="button" size="large">
                Create Category
              </Button>
            </footer>
          </Form>
        </Drawer>

        <Table className="table-block" columns={columns} />
      </Content>
    );
  }
}

export default withApollo(Category);
