import React, { Component } from 'react';

import { Layout, Button } from 'antd';

import UserAvatar from './userAvatar';

const { Header: Nav } = Layout;

class Header extends Component {
  render() {
    return (
      <Nav className="main-header">
        <div className="logo">
          <a href="/">
            My <span>Style</span>
          </a>
        </div>

        <div className="right-side">
          <UserAvatar />
        </div>
      </Nav>
    );
  }
}

export default Header;
