import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AppstoreOutlined, MailOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const token = sessionStorage.getItem('token')
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          Calender
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        {token && <Menu.Item key="2" icon={<MailOutlined />}>
          Logout
        </Menu.Item>}
      </Menu>
    </Header>
  );
};

export default AppHeader;
