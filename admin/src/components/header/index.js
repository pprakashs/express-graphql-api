import React from 'react';
import { Layout } from 'antd';

import UserAvatar from './userAvatar';

const { Header: Nav } = Layout;

const Header = () => {
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
};

export default Header;
