import React, { useContext } from 'react';

import { Avatar, Dropdown, Menu } from 'antd';

import { useLogout } from './../../util/logoutHook';

const UserAvatar = () => {
  const { logout } = useLogout();
  const menu = (
    <Menu className="user-drop-down">
      <Menu.Item>
        <a rel="noopener noreferrer" href="#">
          Setting
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" href="#" onClick={logout}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </Dropdown>
  );
};

export default UserAvatar;
