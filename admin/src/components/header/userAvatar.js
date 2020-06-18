import React from 'react';

import { Avatar, Dropdown, Menu } from 'antd';

const UserAvatar = () => {
  const menu = (
    <Menu className="user-drop-down">
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          Setting
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <Avatar size="large">U</Avatar>
    </Dropdown>
  );
};

export default UserAvatar;
