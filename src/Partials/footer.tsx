import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const {Text} = Typography

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ position: 'fixed',zIndex:5,marginTop:50, left: 0, bottom: 0, width: '100%', textAlign: 'center' }}>
      <Text>Video Meet © {new Date().getFullYear()} All rights reserved.</Text>
    </Footer>
  );
};

export default AppFooter;
