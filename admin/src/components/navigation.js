import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { ShoppingCartOutlined, SettingOutlined, AppstoreOutlined, ShoppingOutlined, LogoutOutlined } from '@ant-design/icons';

const { Sider } = Layout;

import { useLogout } from './../util/logoutHook';

const Navigation = () => {
  const { logout } = useLogout();
  const { pathname } = useLocation();
  return (
    <Sider theme="light" width="300" className="side-bar-menu">
      <Menu>
        <Menu.Item icon={<ShoppingCartOutlined />} className={pathname === '/' ? 'ant-menu-item-selected' : null} title="Products">
          <Link to="/">Products</Link>
        </Menu.Item>
        <Menu.Item icon={<AppstoreOutlined />} className={pathname === '/category' ? 'ant-menu-item-selected' : null} title="Category">
          <Link to="/category">Category</Link>
        </Menu.Item>
        <Menu.Item icon={<ShoppingOutlined />} title="Order">
          <Link to="/orders">Orders</Link>
        </Menu.Item>
        <Menu.Item icon={<SettingOutlined />} title="Setting">
          <Link to="/setting">Setting</Link>
        </Menu.Item>
      </Menu>
      <Button type="link" className="btn" onClick={logout}>
        <LogoutOutlined /> Logout
      </Button>
    </Sider>
  );
};

export default Navigation;
