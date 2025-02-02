import { Button, Card, Form, Input, notification, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import "./login.css";
import { User } from "../../types";
import api from "../../api/api.client.ts";
import { getSession, setSession } from "../../utils/session.ts";
import { Navigate, useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const session = getSession();
  const navigate = useNavigate();

  const onFinish = (user: User) => {
    api.post('/users/login', user)
        .then((res) => {
          if (res.data) {
            setSession(res.data);
            navigate('/');

            notification.success({
              message: 'Login successful!'
            });
          }
        })
        .catch(() => {
          notification.error({
            message: 'Invalid username or password!'
          })
        })
  };

  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
      <div className="login-container">
        <Card className="login-card">
          <Title level={2} className="login-title">QIMA Challenge</Title>
          <Form name="login-form" onFinish={onFinish} layout="vertical">
            <Form.Item
                name="username"
                rules={[{ required: true, message: "Please enter your username!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
  );
};

export default Login;