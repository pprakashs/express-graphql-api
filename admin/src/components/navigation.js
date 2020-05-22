import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu, Button } from 'antd';
import { ShoppingCartOutlined, SettingOutlined, AppstoreOutlined, ShoppingOutlined, LogoutOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Navigation = () => {

    return (
        <Sider theme="light" width="300" className="side-bar-menu">
            <Menu>
                <Menu.Item icon={<ShoppingCartOutlined />} title="Products">
                    <Link to="/">Products</Link>
                </Menu.Item>
                <Menu.Item icon={<AppstoreOutlined />} title="Category">
                    <Link to="/category">Category</Link>
                </Menu.Item>
                <Menu.Item icon={<ShoppingOutlined />} title="Products">
                    <Link to="/orders">Orders</Link>
                </Menu.Item>
                <Menu.Item icon={<SettingOutlined />} title="Products">
                    <Link to="/setting">Setting</Link>
                </Menu.Item>
            </Menu>
            <Button type="link" className="btn"><LogoutOutlined /> Logout</Button>
        </Sider>
    )
}

export default Navigation;