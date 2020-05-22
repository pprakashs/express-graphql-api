import React, { Component } from 'react';
import { Layout, Button, Drawer, Typography } from 'antd';
import { PlusOutlined, LeftOutlined } from '@ant-design/icons';
const { Content } = Layout;

class Category extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
    };
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
        </Drawer>
      </Content>
    );
  }
}

export default Category;
