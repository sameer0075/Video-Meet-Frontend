import React from 'react';
import { Form, Input, Button, Row, Col, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, RedEnvelopeFilled } from '@ant-design/icons';
import '../../Shared/CSS/index.css'
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;

const Register: React.FC = () => {
  const navigation = useNavigate();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    // Replace this with your login API call using axios or fetch
  };

  const navigateRoute = (url:string) => {
    navigation(url)
}

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundImage: 'url("/assets/images/background/background-1.jpeg")', backgroundSize: 'cover' }}>
      <Col xs={20} sm={16} md={12} lg={8}>
        <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={3}>Sign Up!</Title>
          </div>
          <Form onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input prefix={<RedEnvelopeFilled />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
              <div className='margin-top center'>
                <Text onClick={() => navigateRoute("/")} className='text' style={{display: 'block'}}>Already have an account?</Text>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
