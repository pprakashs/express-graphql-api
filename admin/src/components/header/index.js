import React, { Component } from 'react';

import { Layout, Button, Drawer } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import UserAvatar from './userAvatar';
import AddProductForm from './addProductForm';

const { Header: Nav } = Layout;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
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
      <Nav className="main-header">
        <div className="logo">
          <a href="/">
            My <span>Style</span>
          </a>
        </div>

        <div className="right-side">
          <Button type="primary" className="button large" size="large" onClick={this.showDrawer.bind(this)}>
            Add Product
          </Button>

          <Drawer
            title="Add Product"
            placement="right"
            closable={true}
            onClose={this.onClose.bind(this)}
            visible={this.state.visible}
            className="drawer-block"
          >
            <button type="button" className="btn back-arrow" onClick={this.onClose.bind(this)}>
              <LeftOutlined />
            </button>
            <AddProductForm cancel={this.onClose.bind(this)} />
          </Drawer>

          <UserAvatar />
        </div>
      </Nav>
    );
  }
}

export default Header;
