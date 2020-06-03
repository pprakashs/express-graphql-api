import React, { Component, createRef } from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { Layout, Button, Drawer, Typography, Form, Input, Table, notification, Space } from 'antd';
import { PlusOutlined, LeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { CATEGORY_LIST } from './../helpers/getCategory';

const { Content } = Layout;

const openNotificationWithIcon = (type, description, message) => {
  notification[type]({
    message: message,
    description,
    duration: 3,
  });
};

const ADD_CATEGORY = gql`
  mutation($name: String!) {
    addCategory(name: $name) {
      name
    }
  }
`;

const DELETE_CATEGORY = gql`
  query($id: ID!) {
    deleteCategory(id: $id) {
      status
      message
    }
  }
`;

class Category extends Component {
  constructor(props) {
    super(props);
  }
  submitHandle = this.submitHandle.bind(this);
  handleDelete = this.handleDelete.bind(this);
  formRef = createRef();
  state = {
    visible: false,
    loading: true,
    btnLoading: false,
    data: [],
  };

  async getCategory() {
    const {
      data: {
        category: { items },
      },
    } = await this.props.client.query({ query: CATEGORY_LIST });

    const data = items.map((el) => {
      return {
        key: el.id,
        ...el,
      };
    });

    return data;
  }

  columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Slug',
      key: 'slug',
      dataIndex: 'slug',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" size="medium" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button
            type="primary"
            size="medium"
            icon={<DeleteOutlined />}
            loading={this.btnLoading}
            onClick={() => this.handleDelete(record.id)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  async componentDidMount() {
    const data = await this.getCategory();
    this.setState({
      data,
      loading: false,
    });
  }

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

  async handleDelete(id) {
    this.setState({
      loading: true,
    });

    const { data } = await this.props.client.query({
      query: DELETE_CATEGORY,
      variables: {
        id,
      },
    });
    openNotificationWithIcon('error', `${data.deleteCategory.message}`, 'Deleted');
    this.setState({
      loading: false,
    });
  }

  async submitHandle(data) {
    const { name } = data;
    try {
      this.setState({
        loading: true,
      });

      const { data } = await this.props.client.mutate({
        mutation: ADD_CATEGORY,
        variables: {
          name,
        },
      });

      this.formRef.current.resetFields();
      openNotificationWithIcon('success', `${data.addCategory.name} has been created`, 'Created');
      this.setState({
        loading: false,
      });
      //const categoryList = await this.getCategory();
      this.setState({
        data: categoryList,
        loading: false,
      });
    } catch (error) {
      openNotificationWithIcon('error', `${name} ${error.message.split(':')[1]}`, 'Error');
      this.setState({
        loading: false,
      });
    }
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

          <Form onFinish={this.submitHandle} ref={this.formRef} layout="vertical" size="large">
            <Form.Item label="Category Name" rules={[{ required: true, message: 'Category title is required' }]} name="name">
              <Input name="name" />
            </Form.Item>

            <footer className="ant-drawer-footer">
              <Button onClick={this.onClose.bind(this)} block={true} type="link" danger>
                Cancel
              </Button>
              <Button block={true} type="primary" htmlType="submit" className="button" size="large" loading={this.state.loading}>
                Create Category
              </Button>
            </footer>
          </Form>
        </Drawer>

        <Table className="table-block" columns={this.columns} dataSource={this.state.data} loading={this.state.loading} />
      </Content>
    );
  }
}

export default withApollo(Category);
